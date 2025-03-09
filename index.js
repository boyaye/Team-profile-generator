
import fs from 'fs';
import {Manager,Engineer,Intern} from './employeeinfo.js';
import inquirer from 'inquirer';
import { type } from 'os';


let team = [];

const promptformanager = async () =>{
    const managerinfo = await inquirer.prompt([
        {
            type:'input',
            name:'name',
            message :'Enter the team manager name' 
        },
        {
            type:'input',
            name:'id',
            message:'Enter the team manager id'
        },
        {
            type:'input',
            name:'email',
            message:'Enter the team manager email'
        },
        {
            type:'input',
            name:'officenumber',
            message:'Enter the team manager office number'
        }
    ])
    const manager = new Manager(managerinfo.name,managerinfo.id,managerinfo.email,managerinfo.officenumber);
    team.push(manager);
    menu()
}

const menu = async () =>{
    const menuchoice = await inquirer.prompt([
        {
            type:'list',
            name:'action',
            message:'choose an option',
            choices:['Add an Engineer','Add an Intern','team is complete']
        }
    ])

    switch(menuchoice.action){
        case'Add an Engineer':
             promptengineer();
             break;
        case'Add an Intern':
                promptintern();
                break;
        case'team is complete':
        generatehtml();
        break;
    }
}

const promptengineer = async () =>{
    const engineerinfo = await inquirer.prompt([
        {
            type:'input',
            name:'name',
            message:'Enter the engineer name'
        },
        {
            type:'input',
            name:'id',
            message:'Enter the engineer id'
        },{
            type:'input',
            name:'email',
            message:'Enter the engineer email'
        },
        {
            type:'input',
            name:'github',
            message:'Enter the engineer github'
        }
    ])
    const engineer = new Engineer(engineerinfo.name,engineerinfo.id,engineerinfo.email,engineerinfo.github)
    team.push(engineer);
    menu()
}