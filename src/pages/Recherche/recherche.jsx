import React, { useEffect, useState } from "react";
import axios from "axios"; 
export default function Recherche() {


    const [lat, setLat] = useState();
    const [long, setLong] = useState();
    const [toiletsAroundLoc, setToiletsAroundLoc] = useState([]);
    const [isFakePosition, setIsFakePosition] = useState(false);
    const [selectedOption, setSelectedOption] = useState('Tous')
    const [selectedOptionPmr, setSelectedOptionPmr] = useState('Tous')
    const [selectedOptionBebe, setSelectedOptionBebe] = useState('Tous')


    const [bebe, setBebe] = useState("");
    const [pmr, setPMR] = useState("");
    const [type, setType] = useState("");
    const [url, setUrl] = useState();

    /* get position */
    useEffect(() => {

        navigator.geolocation.getCurrentPosition(function (position) {

            setLat(position.coords.latitude);
            setLong(position.coords.longitude);
            setUrl(`https://opendata.paris.fr/explore/embed/dataset/sanisettesparis/map/?disjunctive.type&disjunctive.statut&disjunctive.arrondissement&disjunctive.horaire&disjunctive.acces_pmr&disjunctive.relais_bebe${type}${pmr}${bebe}&basemap=jawg.dark&location=12,${position.coords.latitude},${position.coords.longitude},2.34518&static=false&datasetcard=true&scrollWheelZoom=true`);
            axios.get(`https://opendata.paris.fr/api/records/1.0/search/?dataset=sanisettesparis&q=&rows=10&facet=type&facet=statut&facet=arrondissement&facet=horaire&facet=acces_pmr&facet=relais_bebe&geofilter.distance=${position.coords.latitude}%2C${position.coords.longitude}%2C800`)
                .then((res) => {

                    setToiletsAroundLoc(res.data.records);
                })
        });

    }, []);

    /* filtering */
    useEffect(() => {
        setUrl(`https://opendata.paris.fr/explore/embed/dataset/sanisettesparis/map/?disjunctive.type&disjunctive.statut&disjunctive.arrondissement&disjunctive.horaire&disjunctive.acces_pmr&disjunctive.relais_bebe${type}${pmr}${bebe}&basemap=jawg.dark&location=12,48.85987,2.34518&static=false&datasetcard=true&scrollWheelZoom=true`);
        console.log(url)
    }, [bebe, pmr, type])

    /* go to paris */
    useEffect(() => {
        console.log("position changed to paris");
        setUrl(`https://opendata.paris.fr/explore/embed/dataset/sanisettesparis/map/?disjunctive.type&disjunctive.statut&disjunctive.arrondissement&disjunctive.horaire&disjunctive.acces_pmr&disjunctive.relais_bebe${type}${pmr}${bebe}&basemap=jawg.dark&location=12,${lat},${long},2.34518&static=false&datasetcard=true&scrollWheelZoom=true`);
        axios.get(`https://opendata.paris.fr/api/records/1.0/search/?dataset=sanisettesparis&q=&rows=10&facet=type&facet=statut&facet=arrondissement&facet=horaire&facet=acces_pmr&facet=relais_bebe&geofilter.distance=${lat}%2C${long}%2C800`)
            .then((res) => {
                /* #TODO: limiter cette variable a ~10-15 */
                setToiletsAroundLoc(res.data.records);
            });
    }, [lat, long]);

    const handleChange = (event) => {
        console.log(event.target.value)
        setType(`&refine.type=${event.target.value}`)
        if (event.target.value === 'Tous') {
            setType('')
        } else {
            setType(`&refine.type=${event.target.value}`)
        }
        setSelectedOption(event.target.value)
    };

    const handleChangePmr = (event) => {
        if (event.target.value === "Tous") {
            setPMR('')
        } else {
            setPMR(`&refine.acces_pmr=${event.target.value}`);
        }
        setSelectedOptionPmr(event.target.value);
    };

    const handleChangeBebe = (event) => {
        if (event.target.value === "Tous") {
            setBebe('')
        } else {
            setBebe(`&refine.relais_bebe=${event.target.value}`);
        }
        setSelectedOptionBebe(event.target.value);
    };
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

    const types = ['Tous', 'TOILETTES', 'SANISETTE', 'LAVATORY', 'URINOIR'];
    const yesNoAllOptions = ['Tous', 'Oui', 'Non'];

    return (
        <>
            {/* map */}
            <section className="flex justify-center mb-4">
                <iframe styles="" src={`${url}`} width="400" height="500" frameborder="0"></iframe>
            </section>
            {toiletsAroundLoc.length === 0 ? (<div className="flex flex-col items-center"><p className="text-center font-semibold	text-xl">Rendez vous à paris pour voir les toilettes les plus proches.</p ><button onClick={() => changeLocToParis()} type="button" className="bg-[#ffcd38] rounded-md w-36 px-4 py-1.5 hover:cursor-pointer hover:text-[#4a4a4a] hover:bg-[#f4ce5f] text-[fff] font-semibold mb-4">Aller à Paris</button></div>) : (null)}
            {isFakePosition ? (<div className="flex flex-col items-center"><button onClick={() => changeLocToRealLoc()} type="button" className="bg-[#ffcd38] rounded-md w-44 px-4 py-1.5 hover:cursor-pointer hover:text-[#4a4a4a] hover:bg-[#f4ce5f] text-[fff] font-semibold mb-4">Retourner à votre position</button></div>) : null}
            {/* filtres */}
            <section className="flex justify-center">
                {/* container filtres */}
                <div className="flex flex-col border-4 p-2.5 rounded-lg border-[#ffcd38]" >
                    <div className=" flex flex-row  justify-between w-[340px] mb-2">
                        <span className="mr-2 font-bold"> Type de toilette</span>
                        <select value={selectedOption} className="w-16" onChange={handleChange}>
                            {types.map((option) => (
                                <option key={option} value={option}>
                                    {option}
                                </option>
                            ))}
                        </select>
                    </div>
                    {/* pmr */}
                    <div className="flex flex-row justify-between w-[340px] mb-2">
                        <span className="mr-2 font-bold	">  Accès Personne mobilité réduite            </span>

                        <select value={selectedOptionPmr} className="w-16" onChange={handleChangePmr}>
                            {yesNoAllOptions.map((option) => (
                                <option key={option} value={option}>
                                    {option}
                                </option>
                            ))}
                        </select>
                    </div>
                    {/* bebe */}
                    <div className="flex flex-row  justify-between w-[340px] mb-2">
                        <span className="mr-2 font-bold"> Accès relais bébé            </span>

                        <select value={selectedOptionBebe} className="w-16" onChange={handleChangeBebe}>
                            {yesNoAllOptions.map((option) => (
                                <option key={option} value={option}>
                                    {option}
                                </option>
                            ))}
                        </select>
                    </div>
                </div>

            </section>

        </>);
}