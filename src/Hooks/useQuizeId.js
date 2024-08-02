const quizeId = [];

export default function QuizeId(id){
    if(id){
        quizeId.length = 0;
        quizeId.push(id);
    };

    return quizeId[0];
}