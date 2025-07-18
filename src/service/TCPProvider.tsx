import { createContext, FC, useCallback, useContext, useState } from "react";
import 'react-native-get-random-values';
import { useChunkStore } from "../db/chunkStore";
import TcpSocket from 'react-native-tcp-socket';
import DeviceInfo from "react-native-device-info";
import { Platform } from "react-native";
import RNFS from 'react-native-fs';
import { Buffer } from 'buffer';
import { produce } from "immer";
import { v4 as uuidv4 } from 'uuid';
import { receiveChunkAck, receiveFileAck, sendChunkAck } from "./TCPUtils";




interface TCPContextType {
    server: any;
    client: any;
    isConnected: boolean;
    connectedDevice: any;
    sentFiles: any;
    receivedFiles: any;
    totalSentBytes: number;
    totalReceivedBytes: number;

    startServer: (port: number) => void;
    connectToServer: (host: string, port: number, deviceName: string) => void;
    sendMessage: (message: number | Buffer) => void;
    sendFileAck: (file: any, type: 'file' | 'image') => void;
    disconnect: () => void;

}

const TCPContext = createContext<TCPContextType | undefined>(undefined);

export const useTCP = (): TCPContextType => {
    const context = useContext(TCPContext)
    if (!context) {
        throw new Error('useTCP must be used within a TCPProvider')
    }
    return context;
}

const option = {
    keystore: require('../../tls_certs/server-keystore.p12')
}

export const TCPProvider: FC<{ children: React.ReactNode }> = ({ children }) => {


    const [server, setServer] = useState<any>(null)
    const [client, setClient] = useState<any>(null)
    const [isConnected, setIsConnected] = useState<any>(null)
    const [connectedDevice, setConnectedDevice] = useState<any>(null)
    const [sentFiles, setSentFiles] = useState<any>(null)
    const [receivedFiles, setReceivedFiles] = useState<any>(null)
    const [totalSentBytes, setTotalSentBytes] = useState<any>(null)
    const [totalReceivedBytes, setTotalReceivedBytes] = useState<any>(null)
    const [serverSocket, setServerSocket] = useState<any>(null)

    const { currentChunkSet, setChunkStore, setCurrentChunkSet } = useChunkStore();

    const disconnect = useCallback(() => {
        if (client) {
            client.destrov();
        }
        if (server) {
            server.close();
        }

        setReceivedFiles([])
        setSentFiles([])
        setCurrentChunkSet(null)
        setTotalReceivedBytes(0)
        setChunkStore(null)
        setIsConnected(false)

    }, [client, server])

    //START SERVER 
    const startServer = useCallback((port: number) => {
        if (server) {
            console.log('Server already running')
            return;
        }
        const newServer = TcpSocket.createTLSServer(option, (socket: any) => {
            console.log("Client Connected: ", socket.address());

            setServerSocket(socket);
            socket.setNoDelay(true);
            socket.readableHighWaterMark = 1024 * 1024 * 1;
            socket.writableHighWaterMark = 1024 * 1024 * 1;

            socket.on('data', async (data: any) => {
                const parsedData = JSON.parse(data.toString());

                if (parsedData?.event === 'connect') {
                    setIsConnected(true)
                    setConnectedDevice(parsedData.deviceName)
                }

                if (parsedData?.event === 'file_ack') {
                    receivedFilesAck(parsedData?.file, socket, setReceivedFiles)
                }
                if (parsedData?.event === 'send_chunk_ack') {
                    sendChunkAck(parsedData?.chunkNo, socket, setTotalSentBytes, setSentFiles)
                }
                if (parsedData?.event === 'receive_chunk_ack') {
                    receiveChunkAck(parsedData?.chunk, parsedData?.chunkNo, socket, setTotalReceivedBytes, generateFile)
                }


            })

            socket.on('close', () => {
                console.log('Client Disconnected')
                setReceivedFiles([])
                setSentFiles([])
                setCurrentChunkSet(null)
                setTotalReceivedBytes(0)
                setChunkStore(null)
                setIsConnected(false)
                disconnect();
            })

            socket.on('error', (err: string) => console.log('Socket Error: ', err));
        })

        newServer.listen({ port, host: '0.0.0.0' }, () => {
            const address = newServer.address();
            console.log(Server running on ${ address?.address } : ${ address?.port })
        })
        newServer.on('error', (err) => console.log('Server Error: ', err))
        setServer(newServer)


    }, [server])

    //Start CLIENT 

    const connectToServer = useCallback(
        (host: string, port: number, deviceName: string) => {
            const newClient = TcpSocket.connectTLS({ host, port, cert: true, ca: require('../../tls_certs/server-cert.pem') }, () => {
                setIsConnected(true);
                // setIsConnectedDevice(deviceName)
                const myDeviceName = DeviceInfo.getDeviceNameSync();
                newClient.write(
                    JSON.stringify({ event: 'connect', deviceName: myDeviceName }),
                );
            })

            newClient.setNoDelay(true);
            newClient.readableHighWaterMark = 1024 * 1024 * 1;
            newClient.writableHighWaterMark = 1024 * 1024 * 1;

            newClient.on('data', async (data: any) => {
                const parsedData = JSON.parse(data.toString());

                if (parsedData?.event === 'file_ack') {
                    receiveFileAck(parsedData?.file, newClient, setReceivedFiles)
                }
                if (parsedData?.event === 'send_chunk_ack') {
                    sendChunkAck(parsedData?.chunkNo, newClient, setTotalSentBytes, setSentFiles)
                }
                if (parsedData?.event === 'receive_chunk_ack') {
                    receiveChunkAck(parsedData?.chunk, parsedData?.chunkNo, newClient, setTotalReceivedBytes, generateFile)
                }
            })

            newClient.on('close', () => {
                console.log('Client Disconnected')
                setReceivedFiles([])
                setSentFiles([])
                setCurrentChunkSet(null)
                setTotalReceivedBytes(0)
                setChunkStore(null)
                setIsConnected(false)
                disconnect();
            })

            newClient.on('error', err => console.log('Socket Error: ', err));

            setClient(newClient);

        }, [])

    // GENERATE FILE
    const generateFile = async () => {
        const { chunkStore, resetChunkStore } = useChunkStore.getState();
        if (!chunkStore) {
            console.log("No Chunks or files to process")
            return;
        }
        if (chunkStore?.totalChunks !== chunkStore.chunkArrary.length) {
            console.log("Not all Chunks have been received.x")
            return;
        }

        try {
            const combinedChunks = Buffer.concat(chunkStore.chunkArrary);
            const platformPath = Platform.OS === 'ios' ? `${RNFS.DownloadDirectoryPath}` :
                `${RNFS.DownloadDirectoryPath}`

            const filepath = `${platformPath}/${chunkStore.name}`;

            setReceivedFiles((prevFiles: any)=> 
            produce(prevFiles, (draftFiles:any)=>{
                const fileIndex = draftFiles?.findIndex((f:any) => f.id === chunkStore?.id)
                if(fileIndex !== -1){
                    draftFiles[fileIndex] = {
                        ...draftFiles[fileIndex],
                        uri: filepath,
                        available: true
                    }
                }
            }))

            console.log("File saved successfully", filepath)
            resetChunkStore()

        } catch (error) {
            console.error("Error combining chunks or saving file:", error)
        }
    }

    return (
        <TCPContext.Provider
            value={{
                server,
                client,
                isConnected,
                connectedDevice,
                sentFiles,
                receivedFiles,
                totalSentBytes,
                totalReceivedBytes,
                startServer,
                connectToServer,
                sendMessage,
                sendFileAck,
                disconnect,
            }}>

        </TCPContext.Provider>
    )
}