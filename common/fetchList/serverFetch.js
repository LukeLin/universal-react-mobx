
export default {
    getVote(opts, req){
        return new Promise((resolve, reject) => {
            console.log('getVote');
            setTimeout(() => {
                resolve({
                    data: {
                        message: 123
                    }
                });
            }, 500);
        });
    }
};
