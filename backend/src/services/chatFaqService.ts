import {pool} from "../config/db";

import { createEmbedding } from "../utils/embedding";




export class ChatFaqService {


static async search(
    tenantId:number,
    message:string
){

const embedding = await createEmbedding(message); 



const result =
await pool.query(
`
SELECT
 id,
 question,
 reponse,
 1-(embedding <=> $1::vector) AS similarity

FROM faq

WHERE business_id=$2

ORDER BY embedding <=> $1::vector

LIMIT 1
`,
[
JSON.stringify(embedding),
tenantId
]
);


const faq = result.rows[0];


if(
!faq ||
Number(faq.similarity)<0.80
){

return null;

}


return faq;


}


}