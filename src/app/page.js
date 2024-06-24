'use client'
import Image from "next/image";
import React from "react";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faExclamationCircle } from "@fortawesome/free-solid-svg-icons";
import { faCheck } from "@fortawesome/free-solid-svg-icons";
import { luhn } from "./util/luhn";

export default function Home() {
  const [cardNumber, setCardNumber] = React.useState();
  const [luhnResult, setLuhnResult] = React.useState("Hans Luhn's Checksum Algorithm");
  const [verhoeffResult, setVerHoeffResult] = React.useState('Please input a 16-digit number');
  const [dammResult, setDammResult] = React.useState('Please input a 16-digit number');
  const [errorState, setErrorState] = React.useState(false);

  function handleChange(e) {
    const currentEntry = e.target.value;
    const numericRegex = /^[0-9]*$/;
    
    if (currentEntry.length === 0 || !currentEntry) {
      setErrorState(false);
    }

    if (!currentEntry.match(numericRegex)) {
      setErrorState(true);
    }

    if (currentEntry.length >= 10) {
      const luhnResults = luhn(currentEntry);

      let luhnResult = false;
      if (luhnResults.calculatedCheck === luhnResults.providedCheck) {
        luhnResult = true;
      }
      if (luhnResult) {
        setLuhnResult(
          <div className='mr-4'>
            <FontAwesomeIcon icon={faCheck} style={{color: "#1f8c3a", marginRight: '8px'}} ></FontAwesomeIcon>
            Validation Succeeded
            <div className='flex flex-col justify-start mt-1'>
              <div className='text-sm font-extralight'>Provided Check: {luhnResults.providedCheck}</div>
              <div className='text-sm font-extralight'>Calculated Check: {luhnResults.calculatedCheck}</div>
            </div>
          </div>
        );
      } 
      else {
        setLuhnResult(
          <div className='mr-4'>
            <FontAwesomeIcon icon={faExclamationCircle} style={{color: "#c40202", marginRight: '8px'}} ></FontAwesomeIcon>
            Validation Failed
            <div className='flex flex-col justify-start mt-1'>
              <div className='text-sm font-extralight'>Provided Check: {luhnResults.providedCheck ?? 'N/A'}</div>
              <div className='text-sm font-extralight'>Calculated Check: {luhnResults.calculatedCheck ?? 'N/A'}</div>
            </div>
          </div>
        );
      }
    } else {
      setLuhnResult('Please input a 16-digit number');
    }
  }

  return (
    <main className="flex min-h-screen flex-col items-center justify-between p-12">
      <div className="flex flex-col items-center justify-between p-4">
        <h1 className="mb-4 text-4xl font-extrabold leading-none tracking-tight text-gray-900 md:text-5xl lg:text-6xl dark:text-white">Digit Checker</h1>
        <h2 className="mb-4 font-bold leading-none tracking-tight text-gray-600 md:text-xl lg:text-2xl dark:text-white">Validate and check card numbers before hitting the BIN network</h2>
        <div className="w-3/4">
          {
            !errorState ?
            <input 
              className="px-7 py-3 mb-4 text-xl font-bold rounded-lg border bg-[#ffffff] text-[#444444] focus:outline-[#aaaaaa] border-[#bdbcbc] w-full text-center"
              inputmode="numeric" 
              pattern="[0-9]*" 
              placeholder="Card Number"
              onChange={handleChange}
              maxLength={16}
            >
            </input> :
            <input 
              className="px-7 py-3 mb-4 text-xl font-bold rounded-lg border bg-[#fcc4c4] text-[#444444] focus:outline-[#8c4e4e] border-[#8c4e4e] w-full text-center"
              inputmode="numeric" 
              pattern="[0-9]*" 
              placeholder="Card Number"
              onChange={handleChange}
              maxLength={16}
            >
            </input>
          }
        </div>
        <div className="flex flex-row justify-center space-x-4 mb-4">
          <div className="flex flex-col rounded-2xl w-1/4 bg-[#ffffff] shadow-xl">
            <figure className="flex justify-center items-center rounded-t-2xl bg-[#f6ae84] h-1/3 bg-gradient-to-r from-slate-200">
                <img src="/abacus.svg" alt="Card Preview" className="rounded-t-2xl w-1/2 h-1/2 text-white drop-shadow-xl"></img>
            </figure>
            <div className="flex flex-col p-8">
                <div className="text-2xl font-bold   text-[#374151] pb-6">Luhn Check</div>
                <div className="font-bold text-xl   text-[#374151]"></div>
                <div className="flex justify-end pt-6">
                    <button className="bg-[#c6a067] text-[#ffffff]  font-bold text-base  p-3 rounded-lg hover:bg-purple-800 active:scale-95 transition-transform transform">Learn More (MII)</button>
                </div>
            </div>
          </div>
          <div className="flex flex-col rounded-2xl w-1/4 bg-[#ffffff] shadow-xl">
            <figure className="flex justify-center items-center rounded-t-2xl bg-[#8bf6df] h-1/3 bg-gradient-to-r from-slate-200">
                <img src="/industry.svg" alt="Card Preview" className="rounded-t-2xl w-96 text-white drop-shadow-xl"></img>
            </figure>
            <div className="flex flex-col p-8">
                <div className="text-2xl font-bold md:text-md  text-[#374151] pb-6">Major Industry Identifier</div>
                <div className="font-bold text-xl   text-[#374151]"></div>
                <div className="flex justify-end pt-6">
                    <button className="bg-[#63bec4] text-[#ffffff]  font-bold text-base  p-3 rounded-lg hover:bg-purple-800 active:scale-95 transition-transform transform">Learn More (MII)</button>
                </div>
            </div>
          </div>
          <div className="flex flex-col rounded-2xl w-1/4 bg-[#ffffff] shadow-xl">
            <figure className="flex justify-center items-center rounded-t-2xl bg-[#a68bff] h-1/3 bg-gradient-to-r from-slate-200">
                <img src="/wallet.svg" alt="Card Preview" className="rounded-t-2xl w-1/2 h-1/2 text-white drop-shadow-xl"></img>
            </figure>
            <div className="flex flex-col p-8">
                <div className="text-2xl font-bold   text-[#374151] pb-6">Account Insights</div>
                <div className="font-bold text-xl   text-[#374151]"></div>
                <div className="flex justify-end pt-6">
                    <button className="bg-[#773fa9] text-[#ffffff]  font-bold text-base  p-3 rounded-lg hover:bg-purple-800 active:scale-95 transition-transform transform">Learn More (MII)</button>
                </div>
            </div>
          </div>
          {/* <div className="flex flex-col rounded-2xl w-96 bg-[#ffffff] shadow-xl border-2 border-solid border-[#bdbcbc]">
              <div className="flex flex-col p-8">
                  <div className="text-2xl font-bold   text-[#374151] pb-2">Luhn Algorithm</div>
                  <div className=" text-xl font-light  text-[#374151]">{luhnResult}</div>
              </div>
          </div>
          <div className="flex flex-col rounded-2xl w-96 bg-[#ffffff] shadow-xl border-2 border-solid border-[#bdbcbc]">
              <div className="flex flex-col p-8">
                  <div className="text-2xl font-bold   text-[#374151] pb-2">Verhoeff Algorithm</div>
                  <div className=" text-xl  font-light text-[#374151]">{verhoeffResult}</div>
              </div>
          </div>
          <div className="flex flex-col rounded-2xl w-96 bg-[#ffffff] shadow-xl border-2 border-solid border-[#bdbcbc]">
              <div className="flex flex-col p-8">
                  <div className="text-2xl font-bold   text-[#374151] pb-2">Damm Algorithm</div>
                  <div className=" text-xl font-light  text-[#374151]">{dammResult}</div>
              </div>
          </div> */}
        </div>
        
      </div>
      <footer className="bg-white rounded-lg shadow m-4 dark:bg-gray-800">
        <div className="w-full mx-auto max-w-screen-xl p-4 md:flex md:items-center md:justify-between">
          <span className="mr-4 text-sm text-gray-500 sm:text-center dark:text-gray-400">© 2024 <a href="https://flowbite.com/" className="hover:underline">Graham Burleigh</a>. All Rights Reserved.
        </span>
        <ul className="flex flex-wrap items-center mt-3 text-sm font-medium text-gray-500 dark:text-gray-400 sm:mt-0">
            <li>
                <a href="/about" className="hover:underline me-4 md:me-6">About</a>
            </li>
            <li>
                <a href="/disclaimers" className="hover:underline me-4 md:me-6">Disclaimers</a>
            </li>
            <li>
                <a href="/contact" className="hover:underline">Contact</a>
            </li>
        </ul>
        </div>
    </footer>
    </main>
  );
}
