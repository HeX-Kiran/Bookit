import { useEffect, useState } from "react"

export const useDebouncer = (searchText,delay=500)=>{
    
    const [debouncedValue,setDebouncedValue] = useState();

    useEffect(()=>{
       
        let timer = setTimeout(()=>{
            console.log(searchText);
            setDebouncedValue(searchText);
        },delay)

        return ()=> clearTimeout(timer);
    },[searchText,delay])

    return debouncedValue;
}