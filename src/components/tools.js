export default {
    mergeData(target, data){
        if(data){
            let keys = Object.keys(data);
            for(let i = 0;i<keys[i];i++){
                let key = keys[i];
                if(data[key]) target[key] = data[key];
            }
        }
        
        return target;
    }
};