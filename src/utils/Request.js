import AsyncStorage from '@react-native-community/async-storage';

function getParams (obj) {
    if (!obj){
        return ''
    }
    if (obj === null || obj === '' || obj.length === 0) {
      return ''
    }
    let url = '?'
    for (let key in obj) {
      if (obj[key] !== null) {
        url += (key + '=' + encodeURIComponent(obj[key]) + '&')
      }
    }
    return url.substring(0, url.lastIndexOf('&'))
}

const getToken = async ()=> {
    try {
        const userToken = await AsyncStorage.getItem('userToken');
        console.log('userToken:',userToken)
        return null;//userToken;
    } catch (error) {
        return null
    }
    
}

const baseRequest = async (method,url,param)=> {
    var body 
    if(method == 'POST'){
        body = JSON.stringify(param)
     }else {
       url = url + getParams(param) 
     }
     
    return fetch(url, {
        method: method,
        headers: {
            Accept: 'application/json',
            'Content-Type': 'application/json',
            'Authorization': await getToken(),
        },
        body: body,
    });
}

function fetchPost(url,param){
    return baseRequest('POST',url,param);
}
function fetchGet(url,param){
    return baseRequest('GET',url,param);
}

export {
    fetchPost,
    fetchGet
}

/*
fetchData= async ()=>{
    try {
      let response = await fetchGet(REQUEST_URL);
      let responseJson = await response.json();
      console.log(JSON.stringify(responseJson))
    } catch (error) {
      console.log('err:',error)
    }
  };

  _fetchData() {
    fetchGet(REQUEST_URL)
    .then((response)=>response.json())
    .then((responseData) => {
      console.log(JSON.stringify(responseData))
    })
    .catch((error) => {
      console.log(error)
    })
    .done();
  };
*/