import React, { useState, useEffect } from "react";
import axios from 'axios';
// Bootstrap Grid

import { BiWalk } from 'react-icons/bi';
import "./home.css";




export default function Home() {

  const [positionUser, setPositionUser] = useState({});
  const [toiletsAroundLoc, setToiletsAroundLoc] = useState([]);
  const [distanceAroundToSearch, setDistanceAroundToSearch] = useState();

  const [lat, setLat] = useState();
  const [long, setLong ] = useState();
  const [isFakePosition, setIsFakePosition] = useState(false);

  useEffect(() => {
    navigator.geolocation.getCurrentPosition(function(position) {

      setLat(position.coords.latitude);
      setLong(position.coords.longitude);
    
    axios.get(`https://opendata.paris.fr/api/records/1.0/search/?dataset=sanisettesparis&q=&rows=10&facet=type&facet=statut&facet=arrondissement&facet=horaire&facet=acces_pmr&facet=relais_bebe&geofilter.distance=${position.coords.latitude}%2C${position.coords.longitude}%2C800`)
      .then((res) => {
        let filter;
        if (heure >= 22 || heure < 6) {
          filter = res.data.records.filter((record => record.fields.horaire !== "6 h - 22 h"))
        }
        else {
          filter = res.data.records;
        }
        /* #TODO: limiter cette variable a ~10-15 */
        setToiletsAroundLoc(filter);
      })});
      
  }, []);

  useEffect(() => {
    console.log("position changed to paris");

    axios.get(`https://opendata.paris.fr/api/records/1.0/search/?dataset=sanisettesparis&q=&rows=10&facet=type&facet=statut&facet=arrondissement&facet=horaire&facet=acces_pmr&facet=relais_bebe&geofilter.distance=${lat}%2C${long}%2C800`)
      .then((res) => {
        let filter;
        if (heure >= 22 || heure < 6) {
          filter = res.data.records.filter((record => record.fields.horaire !== "6 h - 22 h"))
        }
        else {
          filter = res.data.records;
        }
        /* #TODO: limiter cette variable a ~10-15 */
        setToiletsAroundLoc(filter);
      });
  }, [lat,long]);

  var now = new Date();
  const heure = now.getHours();



  const changeLocToParis = () => {
    setLat('48.85987');
    setLong('2.333333');
    setIsFakePosition(true);
}
const changeLocToRealLoc=()=>{
    navigator.geolocation.getCurrentPosition(function (position) {

        setLat(position.coords.latitude);
        setLong(position.coords.longitude);
    });
    setIsFakePosition(false);
}
  const valueToDecimal = (number) => {
    let numberToFixed = parseFloat(number).toFixed(0);
    console.log();
    return numberToFixed
  }
  

  const yellow = '#ffcd38'


  return (
    <>

      {/* geoloc */}
      <section className="flex justify-center">
        <iframe style={{ margin: 30, }} src={`https://opendata.paris.fr/explore/embed/dataset/sanisettesparis/map/?disjunctive.type&disjunctive.statut&disjunctive.arrondissement&disjunctive.horaire&disjunctive.acces_pmr&disjunctive.relais_bebe&basemap=jawg.dark&location=15,${lat},${long}&static=false&datasetcard=true&scrollWheelZoom=true`} allow="geolocation" width="350" height="500" ></iframe>
      </section>
      {/* List of toilets */}


      <section >
        <div className="flex justify-center items-center flex-col">
          <h1 style={{}} className="text-2xl font-bold w-full sm:w-[400px] text-center">Les toilettes les plus proches de votre position:</h1>

          <div className="p-2 w-full sm:w-[500px]">
          {isFakePosition ? (<div className="flex flex-col items-center"><button onClick={() => changeLocToRealLoc()} type="button" className="bg-[#ffcd38] rounded-md w-44 px-4 py-1.5 hover:cursor-pointer hover:text-[#4a4a4a] hover:bg-[#f4ce5f] text-[fff] font-semibold mb-4">Retourner à votre position</button></div>) : null}
            {toiletsAroundLoc.length === 0 ? (<div className="flex flex-col items-center"><p className="text-center font-semibold	text-xl">Rendez vous à paris pour voir les toilettes les plus proches.</p ><button onClick={()=>changeLocToParis()}type="button" className="bg-[#ffcd38] rounded-md w-36 px-4 py-1.5 hover:cursor-pointer hover:text-[#4a4a4a] hover:bg-[#f4ce5f] text-[fff] font-semibold">Aller à Paris</button></div>) : (<>{toiletsAroundLoc.map((value) => (
              <>
                <div style={{ boxShadow: '0px 1px 7px #2d2d2d' }} className={`w-full bg-[#4a4a4a] h-[100px] rounded-md mb-3 cursor-pointer scale-100 hover:scale-110 transition duration-300 ease-out`}  >
                  <div>
                    <div className="flex h-full flex-row justify-between">
                      {/* Img toilette */}
                      <img className="h-[100px] w-[100px] rounded-l-md" src="/toilettes.jpg"></img>
                      {/* div cont infos */}
                      <div className=" p-2 h-full flex flex-row" style={{ width: 'calc(100% - 100px)' }}>
                        {/* infos */}
                        <div style={{ display: 'flex', flexDirection: 'column',width: '70%' }} >
                          <div className="font-semibold	overflow-hidden  h-[24px]"><span className="font-bold">Type :</span> {value.fields.type}</div>
                          <div className="font-semibold	overflow-hidden  h-[24px]"> <span className="font-bold text-sm sm:text-base">Arrondissement :</span>   {value.fields.arrondissement}</div>
                          <div className="flex flex-row">
                          <span className="font-bold"> Horaire : &nbsp; </span>{value.fields.horaire === "Voir fiche équipement" ? (<a className="overflow-hidden  h-[24px]" href={`${value.fields.url_fiche_equipement}`}> voir fiche horaire</a>) : (<div className="font-semibold	">   {value.fields.horaire}</div>)}</div>



                        </div>
                        {/* metres */}
                        <div className="flex font-bold text-xl" style={{width: '30% ',lineHeight:'40px', color:yellow}}>
                          {valueToDecimal(value.fields.dist)}m &nbsp; <span style={{lineHeight:'40px'}} className="text-xl hidden sm:block">...</span> &nbsp; <BiWalk size={32} />                   </div>
                      </div>
                    </div>
                  </div>

                </div>

              </>
            ))}</>)}
            
          </div>

        </div>
      </section> </>
  );

}