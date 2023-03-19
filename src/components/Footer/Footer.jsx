import React from 'react'
import { BsGithub, BsLinkedin } from "react-icons/bs"
export default function Footer() {
    const yellow = '#ffcd38'
    return (

        <div className="h-40 mt-8 flex flex-col justify-center items-center font-bold color-[#ffcd38]" style={{ background: "#4a4a4a" }}>
            <span style={{ color: yellow }} className="font-bold text-xl mb-1 border-b-2 border-[#ffcd38]">Anonymous Team
            </span>
            <div className=" flex flex-row w-[350px] justify-between ">
                <span >Théo Landa</span>
                <div className="flex flex-row"><a className="mx-2" href="https://fr.linkedin.com/" target="_blank" >< BsLinkedin size={20} style={{ color: yellow }} /></a> <a href="https://github.com/slorochi" target="_blank" >< BsGithub size={20} style={{ color: yellow }} /></a></div>
            </div>
            <div className=" flex flex-row w-[350px] justify-between">

                <span >Benjamin Fontaine</span>
                <div className="flex flex-row"><a className="mx-2" href="https://fr.linkedin.com/" target="_blank" >< BsLinkedin size={20} style={{ color: yellow }} /></a> <a href="https://github.com/Benjoslecrack" target="_blank" >< BsGithub size={20} style={{ color: yellow }} /></a>
                </div>
            </div>

            <div className=" flex flex-row w-[350px] justify-between">

                <span >Mattéo</span>
                <div className="flex flex-row"><a className="mx-2" href="https://fr.linkedin.com/" target="_blank" >< BsLinkedin size={20} style={{ color: yellow }} /></a> <a href="https://github.com/DrixKC" target="_blank" >< BsGithub size={20} style={{ color: yellow }} /></a></div>
            </div>

            <div className=" flex flex-row w-[350px] justify-between">

                <span >Titouan Clapier</span>
                <div className="flex flex-row"><a className="mx-2" href="https://fr.linkedin.com/" target="_blank" >< BsLinkedin size={20} style={{ color: yellow }} /></a> <a href="https://github.com/TitouanClapier" target="_blank" >< BsGithub size={20} style={{ color: yellow }} /></a></div>
            </div>

            <div className=" flex flex-row w-[350px] justify-between">

                <span >Alex</span>
                <div className="flex flex-row"><a className="mx-2" href="https://fr.linkedin.com/" target="_blank" >< BsLinkedin size={20} style={{ color: yellow }} /></a> <a href="https://github.com" target="_blank" >< BsGithub size={20} style={{ color: yellow }} /></a></div>

            </div>

        </div>
    );
}