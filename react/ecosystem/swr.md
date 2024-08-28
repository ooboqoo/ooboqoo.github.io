# React Query & SWR


## SWR

https://swr.vercel.app/


Conditional Data Fetching

```js
// conditionally fetch
const { data } = useSWR(ready ? '/api/data' : null, fetcher)

// WRONG: will cause multi request
const { data, mutate } = useSWR('/api/data', fetcher)
useEffect(() => {
    if (ready) mutate();
}, [ready]);
```




