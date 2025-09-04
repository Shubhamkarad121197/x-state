
import { useEffect,useRef,useState } from 'react';
import './App.css'

const App=()=>{

  const baseUrl='https://crio-location-selector.onrender.com'

  const [countries,setCountries]=useState([])

  const [storeCountry, setStoreCountry] = useState('');
  const [storeState,setStoreState]= useState('');
   const [storeCity,setStoreCity]= useState('');

  const [isDisabledStateDropdown,setIsDisabledStateDropdown]=useState(true)
  const [isDisabledCityDropdown,setIsDisabledCityDropdown]=useState(true)
  const [state,setStates]=useState([]);
  const [city,setCities]=useState([])

  const effectRan = useRef(false);
  const getCountries=async()=>{
    try{
    let response =await fetch(`${baseUrl}/countries`);
    let data=await response.json()
      setCountries(data)
      

    }
    catch(error){
      console.error('Something went wrong',error)
    }
  }

  const getStates=async(countryName)=>{
    try{
     
      let response=await fetch(`${baseUrl}/country=${countryName}/states`);
      let data=await response.json();
      setStates(data)
      setIsDisabledStateDropdown(false)
      setIsDisabledCityDropdown(true)
    }
    catch(error){
      console.error('Something Went wrong',error);
    }
  }

  const getCities=async(countryName,stateName)=>{
    try{
      let response=await fetch(`${baseUrl}/country=${countryName}/state=${stateName}/cities`);
      let data=await response.json();
      setCities(data)
       setIsDisabledCityDropdown(false)
    }catch(error){
      console.error('Something went wrong',error);
    }
  }

  const handleChangeCountry=(e)=>{
    console.log(e.target.value)
    let countryName=e.target.value
     setStoreCountry(countryName)
     setStates([])
     setCities([])

     getStates(countryName)

      
   


  }
  const handleChangeState=(e)=>{
    let stateName=e.target.value;
    setStoreState(stateName)
    setCities([])
    getCities(storeCountry,stateName)
  }

 const handleCities=(e)=>{
  let cityName=e.target.value;
  setStoreCity(cityName)
 }

  useEffect(()=>{
    if(!effectRan.current){
       getCountries()
       effectRan.current = true;
    }
   
  },[])




  return(
    <>
      <div className='container'>
        <h2>Select Locations</h2>
        <div className='dropdownContainer'>
          <select onChange={(e)=>handleChangeCountry(e)} >
            <option value="">Select Country</option>
            {countries.map((countries)=>
              <option value={countries} key={countries}>{countries}</option>
            )}
          </select>
           <select onChange={(e)=>handleChangeState(e)} disabled={isDisabledStateDropdown}>
               <option value="">Select state</option>
               {state.map((states)=>
               <option value={states}  key={states}>{states}</option>
              )}
           </select>
           <select onChange={(e)=>handleCities(e)} disabled={isDisabledCityDropdown}>
               <option value="">Select City</option>
               {city.map((city)=>
               <option value={city} key={city}>{city}</option>
              )}
           </select>


        </div>
        {storeCountry?(  <div>
          <span><b >You Selected <b style={{fontSize:'20px'}}>{storeCity}</b></b> &nbsp;{storeState},{storeCountry}</span>
          
        </div>):''}    
      
      </div>

    </>
  )

}

export default App;