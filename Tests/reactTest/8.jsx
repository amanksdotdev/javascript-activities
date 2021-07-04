// Explain variations of useEffect()

// 1. Runs everytime the component renders i.e. (ComponentDidMount + ComponentDidUpdate)

useEffect(()=>{
    console.log('useEffect ran');
})

// 2. Runs only when the component mounts i.e like ComponentDidMount in class components

useEffect(()=>{
    console.log('useEffect ran');
},[]) //passing empty dependency array

// 3. Runs only when the passed value in dependency array changes

useEffect(()=>{
    console.log('useEffect ran');
},[count])

