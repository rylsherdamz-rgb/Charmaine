

import {createOpenAI} from "@ai-sdk/openai"
import { storage } from "@/libs/MMKVConfig"
import { useState } from "react"

export default  function useNIM() {

    const [ModelList, setModelList] = useState<[]>([])
    // connst [model, setModel] = useState
    look if i just choose a model in there
    // const apikey = getKey()
    // const nimConfig = createOpenAI({
    // baseURL : "https://integrate.api.nvidia.com/v1",
    // apiKey : apikey
    // })
    //
    const setKey = (api: string) => {
        storage.set("nvidia-api", api )
    }

    const removeKey = (id: string) => {
        storage.remove(id)
    }

    const getKey = (id : string) => {
        const item =  storage.getString(id)
        return item;
    }


    async function getAvailableModels () {
      const key = getKey()
       const request = await fetch(
            "https://integrate.api.nvidia.com/v1/models",
            {
                method : "GET",
                headers : {
                    Authorization :`Bearer ${key}`,
                    Accept : "application/json"
                }
            }
        )

        const data = await request.json()

        setModelList(data.data)

    }


    // implement the selecting and calling of ai agents later

    return {
    getAvailableModels,
    ModelList,
    setKey,
    getKey,
    removeKey,



    }
}
