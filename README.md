<h1>Amortization</h1>
<h2>Tecnologies:</h2>
<ul>
    <li>ReactJS + Vite</li>
    <li>TailwindCSS</li>
    <li>Netify</li>
</ul>
<h2>About:<h2>
<h4>
    Amortization table built in javascript using ReactJS framework 
</h4>
<img src="https://upload.wikimedia.org/wikipedia/commons/thumb/3/3a/UNMSM_coatofarms_seal.svg/1200px-UNMSM_coatofarms_seal.svg.png"
style="width: 100px; height: 100px;"/>
<p style="text-align: justify;">
    This project was built at Universidad Nacional Mayor de San Marcos
    in Peru, as a homework for the Economy course. The idea was to
    recreate an amortization table with some parameters<br/>
    <strong>Owner: </strong> Luis La Torre - <i>Software Engineering Student</i>
</p>
<h2>
    How to use:
</h2>
<ol>
    <li>Clone this repository using this link: <a href="https://github.com/LTprograms/Amortizacion.git">https://github.com/LTprograms/Amortizacion.git</a></li>
    <li>Make sure you have Node already installed typing this comand on a terminal: <i>npm --version</i>
    <ul>
        <li>If you do not have Node installed, download it using this <a href="https://nodejs.org/en" target="_blank">link</a></li>
        <li>Once you have installed, add the npm variable to the PATH</li>
        <li>Make sure again you added the variable to the PATH typing the <i>npm --version</i> command again</li>
    </ul>
    </li>
    <li>Go to your project directory and download all dependencies typing this command on the terminal: <i>npm install</i></li>
    <li>Run your project with: <i>npm run dev</i></li>
</ol>
<h2>
    How it works
</h2>
<p>
If you have followed the previus steps correctly and your project runs successfully, you are going to find this interface.
</p>
<img src="/public/ss.png"/>
<p>
In the left section, we can se some input text fields, they must be filled with the correct data to make it work, here is an example:
</p>
<img src="/public/ss2.png"/>

<h2>Documentation:</h2>
<p>In the <i>src</i> folder, we can find some files and some other folders <i>(components & helpers)</i>. The explanation is bellow:</p>
<ol>
    <li>Components folder
    <ul>
        <li>Error.jsx: This file contains the Error component which is shown when an error occurs. It receives a message as a parameter</li>
        <li>Input.jsx: This file contains the Input component, they represent the input fields on the left side of the interface. Tehy receive some parameters:
        <ul>
            <li>type: input type (ex. text, date, number, etc)</li>
            <li>id: id HTML attribute</li>
            <li>lb: Label text displayed in label tag</li>
            <li>placeholder: Placeholder text inside input</li>
            <li>setter: Setter function to manipulate state of the value</li>
            <li>val: State variable for value</li>
        </ul></li>
        <li>LastRow.jsx: In the table, the last row has a different format from the other ones. It receives the object with all data set in the state. This object contains all total final data</li>
        <li>Row.jsx: Every row have different data from the others. It receives an object containing all data for that row</li>
    </ul></li>
    <li>Helpers folder
    <ul>
        <li>calc.js: It contains some functions to calculate Effective Daily Rate (EDR) and Effective Mounthly Rate (EMR) from Effective Anual Rate (EAR)</li>
        <li>dates.js: It contains some functions to manipulate dates, such as get the days difference from 2 given dates (getDaysDifference()) or get a future date from a number of months given (getFutureDate())</li>
    </ul></li>
</ol>
