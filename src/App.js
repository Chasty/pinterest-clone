import logo from './logo.svg';
import './App.css';
import Header from './components/Header';
import MainBoard from './components/MainBoard';
import unsplash from './api/unsplash';
import { useEffect, useState } from 'react';

function App() {
  const [pins,setPins] = useState([])
  const getImages = (term) =>{
    return unsplash.get("/search/photos",{
      params:{
        query: term
      }
    })
  }
  const onSearchSubmit = (term) =>{
    console.log("in App search submit",term)
    getImages(term).then(res=>{
      let results = res.data.results; 
      console.log("res api",results)
      let newPins = [
        ...results,
        ...pins,
      ]
      newPins.sort(function(a,b){
        return 0.5 - Math.random()
      });

      setPins(newPins)
    })
  }

  const  getNewPins =  async() =>{
    let promises= []
    let pinData = []
    let pines = ['ocean',"Paris","plants","cats"]
    pines.forEach(async(pinTerm)=>{
      promises.push(
         getImages(pinTerm).then(res => {
          let results = res.data.results;
          pinData = pinData.concat(results)
          pinData.sort(function(a,b){
            return 0.5 - Math.random()
          });
        })
      ) 
    });

    Promise.all(promises).then(()=>{
      setPins(pinData)
    });

  }

  useEffect(() => {
    
      getNewPins()
     
     console.log("porb await", pins)
  }, [])
  useEffect(() => {
   
   console.log("porb await 2", pins)
}, [pins])
  return (
    
    <div className="app">
      {console.log("html",pins)}
      <Header oneSubmit={onSearchSubmit}/>
      <MainBoard pins={pins}/>
    </div>
  );
} 

export default App;
