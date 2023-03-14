let lform = document.getElementById("user-form");
const dateinput = document.getElementById('dob');


dateinput.addEventListener('input', (event) => {
    const dob = new Date(event.target.value);
    const now = new Date();
    const age = now.getFullYear() - dob.getFullYear();

    if (age < 18 || age > 55) {
        dateinput.setCustomValidity('Please enter a valid date of birth between ages 18 and 55.');
    }
    else{
        dateinput.setCustomValidity('');
    }
});

const getdata = ()=>{
    let data = localStorage.getItem("user-entry");
    if(data){
        data = JSON.parse(data);
    }
    else{
        data = [];
    } 
    return data;
}
let data = getdata();

const showdata =()=>{
    const data1 = getdata();
    const tableEntries = data1.map((entry)=>{
        const nameCell = `<td>${entry.n}</td>`;

        const emailCell = `<td>${entry.ema}</td>`;
        const passwordCell = `<td>${entry.passw}</td>`;
        const dobCell = `<td>${entry.dob}</td>`;
        const acceptTermsCell = `<td>${entry.ch}</td>`;
        const row = `<tr>${nameCell} ${emailCell} ${passwordCell} ${dobCell} ${acceptTermsCell}</tr>`;
        return row;
    }).join("\n");

    const tab = 
    `<table class="table-auto w-full">
        <tr>
            <th>Name</th>
            <th>Email</th>
            <th>Password</th>
            <th>dob</th>
            <th>accepted terms?</th>
        </tr>${tableEntries}
    </table>`;

    let data = document.getElementById("res");
    data.innerHTML = tab;
    alert(condterms.checked);
   check_terms();
}
const savedform = (event)=>{
    event.preventDefault();
    const n = document.getElementById("name").value; 
    const ema = document.getElementById("mail").value;
    const passw = document.getElementById("password").value;
    const dob = document.getElementById("dob").value;
    const ch = document.getElementById("terms").checked;
    const entry = {
        n,
        ema,
        passw,
        dob,
        ch
    }
    data.push(entry);
    localStorage.setItem("user-entry",JSON.stringify(data));
    showdata();
}


lform.addEventListener("submit",savedform); 

showdata();