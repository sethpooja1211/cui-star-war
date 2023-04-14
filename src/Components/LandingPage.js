import React,  { useCallback, useEffect, useRef, useState } from 'react'
import axios from 'axios';
import { Residents} from './Residents'
import { cx } from '@emotion/css'
import classnames from "classnames"
import { cssTitle } from "./LandingPage.styles";
import { DisplayMessage } from "./DisplayMessage"

export const LandingPage = () => {
     const selectRef = useRef();
     const [isloading, setIsLoading] = useState(true);
     const [selectedValue, setSelectedValue] = useState('select');
     const [planets, setPlanets] = useState([{name: 'select', value:''}]);
     const [residentList, setresidentList] = useState([]);
     const [residentData, setresidentData] = useState([]);
     const [isShowMessage, setIsShowMessage] = useState(false);
     const [apiError, setApiError] = useState(false);

     const callPlantsAPI = useCallback(() => {
        axios.get('https://swapi.dev/api/planets').then((res)=>{
            setPlanets(res?.data?.results)
        }).catch((err)=>{
            setApiError(!apiError);
        })
     },[]);

     useEffect(()=>{
        callPlantsAPI();
        setIsLoading(false);
     },[]);

     const handleSubmit = async ()=> {
        setIsLoading(true);
        setApiError(false);
        await loadResidentData();
     };

     const handleSelectOnchange = useCallback((event) => {
        if(selectRef?.current?.value === selectedValue) return;
        setSelectedValue(event?.target?.value);
        axios.get(`${event?.target?.value}`).then((res)=>{
            setresidentList(res?.data?.residents);
        });
     },[]);

     const getResidentDataBy = (url) => axios.get(`${url}`);

     const loadResidentData = useCallback(()=> {
        const urlList = [];
        residentList?.length > 0 && residentList?.map((item) => {
            urlList.push(getResidentDataBy(item));
            console.log('urlList', urlList) ;
        });
        if (urlList?.length === 0) {
             setIsShowMessage(true);
             setresidentData([]);
             setIsLoading(false);
        }
        const peopleData = [];
        Promise.all(urlList).then((values) => {
            values.map((item,key)=> {
                peopleData.push(item?.data)
                setIsShowMessage(false)
                try{
                    setresidentData(peopleData);
                    setIsLoading(false);
                } catch(error) {
                    setApiError(true);
                    console.log(`facing following issue ${error}, Please try again later`);
                }

            })
        })
        .catch((error)=>{
            setApiError(true);
            console.log(`facing following issue ${error}, Please try again later`);
        })
     },[residentList]); 

     const options = planets?.length > 0 && planets;
     return (
        <div className={classnames("cui-app-table", cx(cssTitle))}>
          <div className={'cui-planet-form'}>
             {options?.length < 1 && <>...loading</>}
             {options && (<form onSubmit={handleSubmit}>
                <div>
                     <label aria-label='name'>Planet Name</label>
                     <select aria-label='selectbox' className={'cui-planet-select'} ref={selectRef} onChange={(e)=> handleSelectOnchange(e)}>
                        {options && options?.map((item, key)=>
                            <option key={key} value={item?.url}>{item?.name}</option>
                        )}
                     </select>
                     <button 
                       type='button'
                       aria-label='submit'
                       onClick={handleSubmit}
                     >
                      Submit
                     </button>
                </div>
             </form>)}
          </div>
          <div className={'cui-star-war-error'}>
             {apiError && <div><h1>Something went wrong, Please try after some time.</h1></div>}
          </div>
          {isloading && <>...loading</>}
          {(!isShowMessage && residentData && residentData?.length > 0 && <Residents data={residentData} />)}
          { !isloading && isShowMessage && !residentData?.length && <DisplayMessage />}
        </div>
     )

}