// fetch
import { ref } from 'vue'

export async function useFetchPost(target, data) {
    // for (let key of data.entries()) {
    //     console.log(key[0], key[1])
    // }

    const response = await fetch(target, {
        method: "POST",
        body: data
    })

    return response
}