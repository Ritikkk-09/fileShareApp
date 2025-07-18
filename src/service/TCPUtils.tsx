import { Buffer } from 'buffer';
import { produce } from "immer";
import { Alert } from 'react-native';
import { useChunkStore } from '../db/chunkStore';

export const receiveFileAck = async(data:any, socket:any, setReceivedFiles:any )=>{
}
export const sendChunkAck = async(chunkIndex:any, socket:any, setTotalSentBytes:any, setSentFiles:any )=>{
}
export const receiveChunkAck = async(chunk:any, chunkNo:any, setTotalReceivedBytes:any, generateFile:any )=>{
}

