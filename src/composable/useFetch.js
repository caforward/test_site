// fetch
import { ref } from 'vue'

export async function useFetchPost(target, data) {
    console.log('useFetchPost', data)
    const response = await fetch(target, {
        method: "POST",
        body: data
    })

    return response
}