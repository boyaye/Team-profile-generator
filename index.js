
import fs from 'fs';
import {Manager,Engineer,Intern} from './employeeinfo.js';
import inquirer from 'inquirer';


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
            name:'manager',
            message:"Enter the position"
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
    const manager = new Manager(managerinfo.name,managerinfo.id,managerinfo.email,managerinfo.officenumber,managerinfo.manager);
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
            name:'skill',
            message:"Enter the skill"
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
    const engineer = new Engineer(engineerinfo.name,engineerinfo.id,engineerinfo.email,engineerinfo.github,engineerinfo.skill)
    team.push(engineer);
    menu()
}

const promptintern = async () =>{
    const interninfo = await inquirer.prompt([
        {
            type:'input',
            name:'name',
            message:'Enter the intern name'
        },
        {
            type:'input',
            name:'Intern',
            message:"Enter the position"
        },
        {
            type:'input',
            name:'id',
            message:'Enter the intern id'
        },
        {
            type:'inpute',
            name:'email',
            message:'Enter the intern email'
        },{
            type:'input',
            name:'school',
            message:'enter the intern school'
        }
    ])
    const intern = new Intern(interninfo.name,interninfo.position,interninfo.id,interninfo.email,interninfo.school);
    team.push(intern)
    menu()
}

const generatehtml = () =>{
    let htmlinfo = `
    <!DOCTYPE html>
<html lang="en">
<head>
    <meta charset="UTF-8">
    <meta name="viewport" content="width=device-width, initial-scale=1.0">
    <link rel="stylesheet" href="./style.css">
    <link rel="stylesheet" href="https://cdnjs.cloudflare.com/ajax/libs/font-awesome/6.7.2/css/all.min.css">
    <title>Document</title>
</head>
<body>
    <main>
        <h1>My Team</h1>
        <div class="section">
               ${generatecards()}
        </div>
        
    </main>
    
</body>
</html>
    `
    fs.writeFileSync('./team.html',htmlinfo)
}

const generatecards = () =>{
    console.log(team)
     return team.map(member => {
        console.log(member)
       return `
        <div class="list">
                    <header>
                        <h3>${member.name}</h3>
                      ${member.position?`<h4><i class="fas fa-mug-hot"></i>${member.position}<h4/>`:''}
                      ${member.skill?`<h4><i class="fa-solid fa-glasses"></i>${member.skill}<h4/>`:''}
                    </header>
                    <table class="info">
                        <tr>
                            <td>ID:${member.id}</td>
                        
                        </tr>
                        <tr>
                            <td>Email:<a href="mailto:${member.email}">${member.email}</a></td>
                          
                        </tr>           
                        <tr>
                           ${member.officenumber ? `<td>Office number:${member.officenumber}</td>` : ''}
                            ${member.github ? `<td>GitHub:<a href="https://github.com/
                            ${member.github}" target="_blank">${member.github}</a></td>` : ''}
                            ${member.school ? `<td>School:${member.school}</td>` : ''}
                                    
                        </tr>
                    </table>
                    </div>
    
        `
     
    }).join('');
 
}
const startApp = async () => {
    await promptformanager();
};

startApp();
