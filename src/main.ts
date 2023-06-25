import Experience from './XrExperience/Experience'
import './style.css'


const canvas = document.querySelector('.experience-canvas') as HTMLCanvasElement ; 

const experience = new Experience( canvas ) ; 

console.log( experience ); 