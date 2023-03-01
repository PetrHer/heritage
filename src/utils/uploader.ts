/* eslint-disable @typescript-eslint/no-unsafe-call */
/* eslint-disable @typescript-eslint/no-unsafe-assignment */
import { createClient } from '@supabase/supabase-js';

const supabaseUrl = 'https://bnjcklhtmxxsdvaqzmpj.supabase.co';
const supabaseKey = 'eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJpc3MiOiJzdXBhYmFzZSIsInJlZiI6ImJuamNrbGh0bXh4c2R2YXF6bXBqIiwicm9sZSI6InNlcnZpY2Vfcm9sZSIsImlhdCI6MTY3MzgxMDAzNSwiZXhwIjoxOTg5Mzg2MDM1fQ.NdMEH14uzkg--dxpc5n-WMM4730LDuFm5lbfkFqTGOo'
const client = createClient(supabaseUrl, supabaseKey);

export const uploadImage = async (file: File,name:string) => {
  const { data, error } = await client.storage.from('herytage').upload(`/${name}`,file,{
    cacheControl: '3600',
    upsert: true
  })
  //await client.storage.createSignedUrl(
    //`${directory}/${file.name}`,
    //60 // expiry time in seconds
  //);

if (error) {
    console.error(error);
    return;
  }
const res = client.storage.from('herytage').getPublicUrl(data.path)
return res
  //const { signedURL, publicURL } = data;

  // Upload the file using the signed URL
//   await fetch(data, {
//     method: 'PUT',
//     body: file,
//     headers: {
//       'Content-Type': file.type,
//     },
//   });

  //console.log(`Image uploaded to ${publicURL}`);
};
