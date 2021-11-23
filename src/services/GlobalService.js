const GlobalService = {
    setGlobal: (key,val) => {
        GLOBAL[key] = val;
    },
    getGlobal: (key) => {
        return GLOBAL[key];  
    },
}
export default GlobalService;