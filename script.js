
// First we get the viewport height and we multiple it by 1% to get a value for a vh unit
let vh = window.innerHeight * 0.01;
// Then we set the value in the --vh custom property to the root of the document
document.documentElement.style.setProperty('--vh', `${vh}px`);
window.addEventListener('resize', () => {
  // We execute the same script as before
  let vh = window.innerHeight * 0.01;
  document.documentElement.style.setProperty('--vh', `${vh}px`);
});

let InterditsOuObligatoires = {"&" : [], "@" : []};

let ObligatoiresIndexMaisMieux = [-1];

function SelectObligatoires(txt) {
    
    elem = document.getElementsByClassName('ask')[0];
    if (elem) {
        elem.parentNode.removeChild(elem);
    }

    divtohide = document.getElementsByClassName('result')[0];
    divtohide.style = "display : none;"
    divresult = document.getElementsByClassName('look')[0];
    divresult.innerHTML += '<div class="Obligatoire ask"><h2 style="color: #00916d">Lettres permises (@) :</h2><input id="Obligatoireinput"><button id="boutoncoolobligatoire" class="valider">Selection terminée</button></div>'
    
    buttonac = document.getElementById("boutoncoolobligatoire");

    

    document.getElementById("Obligatoireinput").focus();
    Edit = false;

    if (!ObligatoiresIndexMaisMieux.includes(txt.length - 1)) {
        ObligatoiresIndexMaisMieux.push(txt.length - 1);
    } else {
        console.log(ObligatoiresIndexMaisMieux);
        Edit = true;
        betterindex = ObligatoiresIndexMaisMieux.indexOf(txt.length - 1) - 1;
        console.log(betterindex);
        oldtexte = InterditsOuObligatoires["@"][betterindex];
        
        
        for (let i = 0; i < oldtexte.length; i++) {
            document.getElementById("Obligatoireinput").value += oldtexte[i].toLowerCase();
        }
        
    }
    document.getElementById("saisie").readOnly = true;
    

    function changestatus() {
        
        texte = document.getElementById("Obligatoireinput").value.toUpperCase().split('');
        
        const nt = [];
        for (let i = 0; i < texte.length; i++) {
            nt.push(texte[i]);
        }

        if (Edit == false) {
            InterditsOuObligatoires["@"].push(nt);
        } else {
            InterditsOuObligatoires["@"][betterindex] = nt;
            console.log(InterditsOuObligatoires);
        }
        
        //elem = document.getElementsByClassName('ask')[0];
        //elem.parentNode.removeChild(elem);
        //document.getElementsByClassName('result')[0].style = "display : block;";
        divresult = document.getElementsByClassName('look')[0];
        //divresult.innerHTML += '<div class=><h2>Saisie prise en compte</h2><img src="./images/checked.svg" width="10%"></div>'
        document.getElementById("Obligatoireinput").value = "Saisie prise en compte";
        document.getElementById("Obligatoireinput").style = "background-color : #11998e; color : white; text-align : center";
        document.getElementById("saisie").removeAttribute('readonly');
        document.getElementById("saisie").focus();
        
        document.getElementsByClassName("valider")[1].style = "display : none";

        validerbuttonleft.style = "background-color : #11998e; cursor : pointer";
        validerbuttonleft.disabled = false;

        
       
    }
    document.getElementById("saisie").value = txt;


    var validerbuttonleft = document.getElementsByClassName("valider")[0];

    validerbuttonleft.style = "background-color : #e53935; cursor : default";;
    validerbuttonleft.disabled = true;
    buttonac.addEventListener('click', changestatus);


}

function SelectInterdit(txt) {
    elem = document.getElementsByClassName('ask')[0];
    if (elem) {
        elem.parentNode.removeChild(elem);
    }

    
    
    divtohide = document.getElementsByClassName('result')[0];
    divtohide.style = "display : none;"
    divresult = document.getElementsByClassName('look')[0];

    
    
    divresult.innerHTML += '<div class="Interdits ask"><h2 style="color: #e53935;">Lettres interdites (&) :</h2><input id="Interditinput"><button id="boutoncoolinterdits" class="valider"">Selection terminée</button></div>'
    buttonac = document.getElementById("boutoncoolinterdits");
    document.getElementById("Interditinput").focus();
    document.getElementById("saisie").readOnly = true;

    function changestatus() {
        
        texte = document.getElementById("Interditinput").value.toUpperCase().split('');
        const nt = [];
        for (let i = 0; i < texte.length; i++) {
            nt.push(texte[i]);
        }
        InterditsOuObligatoires["&"].push(nt);
        document.getElementById("Interditinput").value = "Saisie prise en compte";
        document.getElementById("Interditinput").style = "background-color : #11998e; color : white; text-align : center";
        document.getElementById("Interditinput").readOnly = true;
        document.getElementById("saisie").removeAttribute('readonly');
        document.getElementById("saisie").focus();

        document.getElementsByClassName("valider")[1].style = "display : none";

        validerbuttonleft.style = "background-color : #11998e; cursor : pointer";
        validerbuttonleft.disabled = false;
        
       
    }
    document.getElementById("saisie").value = txt;

    var validerbuttonleft = document.getElementsByClassName("valider")[0];

    validerbuttonleft.style = "background-color : #e53935; cursor : default";;
    validerbuttonleft.disabled = true;

    buttonac.addEventListener('click',changestatus);
    

}


function detectchanged() {
    var max = 21;
    if (document.getElementById("saisie").value.length > max) {
        document.getElementById("consigne").textContent = "Mot trop long";
        document.getElementById("consigne").style = "color : #e53935";
        document.getElementsByClassName("valider")[0].style = "background-color : #e53935; cursor : default";
    } else {
        if (document.getElementById("consigne").textContent != "Critère pour le mot cherché :") {
            document.getElementById("consigne").textContent = "Critère pour le mot cherché :";
            document.getElementById("consigne").style = "color : black";
            document.getElementsByClassName("valider")[0].style = "background-color : #11998e; cursor : pointer";
        }
        
        if ( document.getElementById("saisie").value[document.getElementById("saisie").value.length - 1] == "@") {
            oldvalue = document.getElementById("saisie").value;
            SelectObligatoires(oldvalue);
        }
        if ( document.getElementById("saisie").value[document.getElementById("saisie").value.length - 1] == "&") {
            oldvalue = document.getElementById("saisie").value;
            SelectInterdit(oldvalue);
        }
    }
    
}

function browseweb(){
    elementactuel = document.getElementById("resultats").value;
    window.open('https://www.larousse.fr/dictionnaires/francais/' + elementactuel.toLowerCase(), '_blank').focus();
}

let whofocus;

function lastfocusset(id){
    whofocus = id;
}


function addCaracter(carac) {
    function insertAtCursor(myField, myValue) {
        //IE support
        if (document.selection) {
            myField.focus();
            sel = document.selection.createRange();
            sel.text = myValue;
            
            myField.focus();
            
        }
        //MOZILLA and others
        else if (myField.selectionStart || myField.selectionStart == '0') {
            var startPos = myField.selectionStart;
            var endPos = myField.selectionEnd;
            myField.value = myField.value.substring(0, startPos)
                + myValue
                + myField.value.substring(endPos, myField.value.length);
            myField.focus();
            myField.selectionStart = startPos + 1;
            myField.selectionEnd = startPos + 1;
        } else {
            myField.value += myValue;
        }
    }

    insertAtCursor(document.getElementById(whofocus), carac);
    detectchanged();
}

function endWaiterInterdits(){
    var texte = document.getElementById("Interditinput").value;
    resultatvoulu = texte.toUpperCase().split(' ');
    resultatvoulu = resultatvoulu.split('');
    console.log(resultatvoulu);
}

function go() {
    
    elem = document.getElementsByClassName('ask')[0];
    if (elem) {
        elem.parentNode.removeChild(elem);
    }

    resultat = document.getElementById("saisie").value.toUpperCase()
    

    taille = resultat.length;
    
    function problem(type) {
        alert(type);
    }

    var file =  localStorage.getItem(taille);

    if (file == null) {
        //problem("Mot trop long (" + taille.toString() + " / 21 lettres)");
        return "error";
    } else {
        file = file.split(',');
    }

    

    mots = file
    let continuer = false
    function distanceHamming(motatrouver, diff, error) {

        var texte = "";
        
        function SelectObligatoires() {
            divtohide = document.getElementsByClassName('result')[0];
            divtohide.style = "display : none;"
            divresult = document.getElementsByClassName('look')[0];
            divresult.innerHTML += '<div class="Obligatoire ask"><h2 style="color: #2c7744">Lettres obligatoires (@) séparés par des espaces</h2><input id="Obligatoireinput"><button id="boutoncoolinterdits" class="valider">Selection terminée</button></div>'
            
            buttonac = document.getElementById("boutoncoolinterdits");

            function changestatus() {
                
                texte = document.getElementById("Obligatoireinput").textContent.toUpperCase().split("");
                InterditsOuObligatoires["@"] += texte;
                
               
            }

            buttonac.addEventListener('click',changestatus());
   
   
        }

        
        var ObligatoiresIndex = [];
        var InterditsIndex = [];
        
        
        for (let caracindex = 0; caracindex < motatrouver.length; caracindex++) {
            if (Object.keys(InterditsOuObligatoires).includes(motatrouver[caracindex])) {
                if (motatrouver[caracindex] == "&") {
                    InterditsIndex.push(caracindex);

                } else {
                    ObligatoiresIndex.push(caracindex);

                }
            }
        }
        
        
        
        
        
        var touslesmots = []
        
        var attention = ["*", " "];
        
        var special = {"/" : ["A", "E", "I", "O", "U", "Y"], "#" : [ "B", "C", "D", "F", "G", "H", "J", "K", "L", "M", "N", "P", "Q", "R", "S", "T", "V", "W", "X", "Z"]};

        scoremin = 0
        for (let lettre = 0; lettre < motatrouver.length; lettre++) {
            if (attention.includes(motatrouver[lettre])) {
                scoremin++;
            }
        }
        
        
        
        
        console.log(mots);
        for (let motindex = 0; motindex < mots.length; motindex++) {
            var line = mots[motindex];

            
            var score = 0;
            for (let charac = 0; charac < line.length; charac++) {
                if (line[charac] != motatrouver[charac]) {
                    if ( Object.keys(special).includes(motatrouver[charac])) {
                        if (special[motatrouver[charac]].includes(line[charac])) {
                            
                        } else {
                            score++;
                        }
                    } else if (Object.keys(InterditsOuObligatoires).includes(motatrouver[charac])) {
                        if (motatrouver[charac] == "&") {
                            indexducarac = InterditsIndex.indexOf(charac);
                            if (InterditsOuObligatoires["&"][indexducarac].includes(line[charac])) {
                                score++;
                            }
                                
                        } else {
                            indexducarac = ObligatoiresIndex.indexOf(charac);
                            
                            if (InterditsOuObligatoires["@"][indexducarac].includes(line[charac])) {
                                
                            } else {
                                score++;
                            }

                        }
                    } else {
                        score++;
                    }
                    
                }
            }
            var tuplee = [score, line];

            
            
            touslesmots.push(tuplee);
        }
            
        
            
        var filtre = touslesmots.sort();

        

        var Minimum = diff;
        var max = scoremin + Minimum;
        var listefinale = [];
        for (let i = 0; i < filtre.length; i++) {
            if (filtre[i][0] <= max) {
                listefinale.push(filtre[i][1]);
            }
        }

        console.log(listefinale);

        select = document.getElementById('resultats');
        select.innerHTML = "";
        for (var i = 0; i < listefinale.length; i++){
            var opt = document.createElement('option');
            opt.value = listefinale[i];
            opt.innerHTML = listefinale[i];
            select.appendChild(opt);
        }

        document.getElementById('resultats').focus();

        function addChercherInternet() {
            divresult = document.getElementsByClassName('result')[0];
            var btn = document.createElement('button');
            btn.value = "Chercher sur internet";
            btn.innerHTML = "Chercher sur internet";
            btn.className = "internet";
            btn.id = "boutonpoursurflarousse";
            btn.setAttribute('onclick','browseweb()');
            divresult.appendChild(btn);
        }

       

        textresult = document.getElementById('textresultat');
        if (listefinale.length > 1) {
            divtohide = document.getElementsByClassName('result')[0];
            divtohide.style = "display : block;"
            if (error == "none") {
                textresult.innerHTML = listefinale.length.toString() + " résultats trouvés";
                textresult.style = "color : #115099;";
            } else {
                textresult.innerHTML = "Pas de résultat. Voilà " + listefinale.length.toString() + " résultats voisins";
                textresult.style = "color : #e53935";;
            }
            if (document.getElementById("boutonpoursurflarousse")) {

            } else {
                addChercherInternet();
            }
            
            
        }
        if (listefinale.length == 1) {
            divtohide = document.getElementsByClassName('result')[0];
            divtohide.style = "display : block;"
            if (error == "none") {
                textresult.innerHTML = "1 résultat trouvé";
                textresult.style = "color : #115099;";
            } else {
                textresult.innerHTML = "Pas de résultat. Voilà 1 résultat voisin";
                textresult.style = "color : #e53935";;
            }
            if (document.getElementById("boutonpoursurflarousse")) {

            } else {
                addChercherInternet();
            }
        }
        if (listefinale.length == 0) {
            error = "pasdupremiercoup"
            return distanceHamming(motatrouver, diff + 1, error)
        }

        
                
        
    }

    distanceHamming(resultat, 0, "none");

}


document.onkeypress = function(evt) {
    evt = evt || window.event;
    var charCode = evt.keyCode || evt.which;
    if (document.getElementById("saisie") == document.activeElement) {
        if (charCode == 13) {
            go();
        }
    }
    
};


let IndexsCaracs = [-1, -1]

function selectcase(id) {
    
    //id = id.split('-')[1];
    which = document.getElementById(id).parentNode.className;
    
    which = which.split(' ')[1];
    if (which == "mot1") {
        IndexsCaracs[0] =  parseInt(id.split('-')[1]) - 1;
    } else {
        IndexsCaracs[1] = parseInt(id.split('-')[1]) - 1;
    }
    others = document.getElementsByClassName(which)[0].childNodes;

    

    for (let i = 0; i < others.length; i += 1) {
        others[i].style.backgroundColor = 'white';
    }

    document.getElementById(id).style.backgroundColor = "#00916d";

    if (IndexsCaracs[0] != -1 && IndexsCaracs[1] != -1) {
        document.getElementsByClassName('valider')[0].style = "display : block;";
        location.href = "#";
        location.href = "#valider-button";
        
    }
    


}

function distanceHammingSiplyfied(motatrouver, diff, error) {

    taille = motatrouver.length;
    

    var file =  localStorage.getItem(taille);

    if (file == null) {
        //problem("Mot trop long (" + taille.toString() + " / 21 lettres)");
        return "error";
    } else {
        file = file.split(',');
    }

    

    mots = file;

    var ObligatoiresIndex = [];
    var InterditsIndex = [];
    
    
    for (let caracindex = 0; caracindex < motatrouver.length; caracindex++) {
        if (Object.keys(InterditsOuObligatoires).includes(motatrouver[caracindex])) {
            if (motatrouver[caracindex] == "&") {
                InterditsIndex.push(caracindex);

            } else {
                ObligatoiresIndex.push(caracindex);

            }
        }
    }
    
    
    
    
    
    var touslesmots = []
    
    var attention = ["*", " "];
    
    var special = {"/" : ["A", "E", "I", "O", "U", "Y"], "#" : [ "B", "C", "D", "F", "G", "H", "J", "K", "L", "M", "N", "P", "Q", "R", "S", "T", "V", "W", "X", "Z"]};

    scoremin = 0
    for (let lettre = 0; lettre < motatrouver.length; lettre++) {
        if (attention.includes(motatrouver[lettre])) {
            scoremin++;
        }
    }
    
    
    
    
    
    for (let motindex = 0; motindex < mots.length; motindex++) {
        var line = mots[motindex];

        
        var score = 0;
        for (let charac = 0; charac < line.length; charac++) {
            if (line[charac] != motatrouver[charac]) {
                if ( Object.keys(special).includes(motatrouver[charac])) {
                    if (special[motatrouver[charac]].includes(line[charac])) {
                        
                    } else {
                        score++;
                    }
                } else if (Object.keys(InterditsOuObligatoires).includes(motatrouver[charac])) {
                    if (motatrouver[charac] == "&") {
                        indexducarac = InterditsIndex.indexOf(charac);
                        if (InterditsOuObligatoires["&"][indexducarac].includes(line[charac])) {
                            score++;
                        }
                            
                    } else {
                        indexducarac = ObligatoiresIndex.indexOf(charac);
                        
                        if (InterditsOuObligatoires["@"][indexducarac].includes(line[charac])) {
                            
                        } else {
                            score++;
                        }

                    }
                } else {
                    score++;
                }
                
            }
        }
        var tuplee = [score, line];

        
        
        touslesmots.push(tuplee);
    }
        
    
        
    var filtre = touslesmots.sort();

    

    var Minimum = diff;
    var max = scoremin + Minimum;
    var listefinale = [];
    for (let i = 0; i < filtre.length; i++) {
        if (filtre[i][0] <= max) {
            listefinale.push(filtre[i][1]);
        }
    }

    listefinale = [motatrouver, listefinale];

    /*
    select = document.getElementById('resultats');
    select.innerHTML = "";
    for (var i = 0; i < listefinale.length; i++){
        var opt = document.createElement('option');
        opt.value = listefinale[i];
        opt.innerHTML = listefinale[i];
        select.appendChild(opt);
    }

    document.getElementById('resultats').focus();

    function addChercherInternet() {
        divresult = document.getElementsByClassName('result')[0];
        var btn = document.createElement('button');
        btn.value = "Chercher sur internet";
        btn.innerHTML = "Chercher sur internet";
        btn.className = "internet";
        btn.id = "boutonpoursurflarousse";
        btn.setAttribute('onclick','browseweb()');
        divresult.appendChild(btn);
    }

   

    textresult = document.getElementById('textresultat');

    */
    
    if (listefinale.length == 0) {
        error = "pasdupremiercoup"
        return distanceHamming(motatrouver, diff + 1, error)
    } else {
        return listefinale;
    }

    
            
    
}

Mots = {"Mot1" : "", "Mot2" : ""};
let WordsSelected = 0

function generate() {

    document.getElementById("buttonvalider1").textContent = "Ok";
    document.getElementById("buttonvalider1").style = "display : none";

    document.getElementById("buttonvalider2").textContent = "Ok";
    document.getElementById("buttonvalider2").style = "display : none";

    document.getElementById("whattodo").textContent = "";


    console.log(IndexsCaracs);
    mot1 = document.getElementsByClassName("mot1")[0];


    mot2 = document.getElementsByClassName("mot2")[0];

    

    


    mot2.style = "flex-direction : column";
    others = mot2.childNodes;


    carac1index = IndexsCaracs[0];
    carac2index = IndexsCaracs[1];

    for (let i = 0; i < others.length; i += 1) {
        if (i == 0) {
            others[i].style = 'margin : 0; margin-top : 50px; border: 5px black solid;border-top: 5px black solid;border-bottom: 2.5px black solid;';
        }
        else if (i == others.length - 1) {
            others[i].style = 'margin : 0; border: 5px black solid;border-top: 2.5px black solid;border-bottom: 5px black solid;';
        } else {
            others[i].style = 'margin : 0; border: 5px black solid;border-top: 2.5px black solid;border-bottom: 2.5px black solid;';
        }
        
    }
    var divresult = document.getElementsByClassName("final")[0];
    var content;
    if (document.getElementsByClassName("mot2final").length > 0) {
        document.getElementsByClassName("mot2final")[0].parentNode.removeChild(document.getElementsByClassName("mot2final")[0])
        
    }
    
    content = document.createElement('div');
    
    
    var mot2final = document.createElement('div');
    mot2final.innerHTML = mot2.innerHTML;
    mot2final.style = "display : flex; flex-direction: column; margin-left: 50%;"
    mot2final.className = "mot2final";
    
    mots2enfants = mot2final.childNodes;

    var mot2toreplace;
    for (let i = 0; i < mots2enfants.length; i += 1) {
        if (i == carac2index) {
            mot2toreplace = mots2enfants[i];
            break
        }
        
        
    }
    
    var clientWidth = parseInt(document.getElementById("1-1").offsetWidth / vh);
    if (clientWidth > 8.5) {
        clientWidth = 10;
    } else {
        clientWidth = 7;
    }

    console.log(clientWidth.toString() + "vh de largeur détecté.");
    widthtotake = clientWidth;
    
    margintoto = carac1index * widthtotake;

    mot2toreplace.innerHTML = mot1.innerHTML;
    mot2toreplace.style = "display : flex; flex-direction : row; margin : 0px; padding: 0px; border: 0; margin-left: -" + margintoto.toString() +  "vh; width: fit-content;";
    console.log(mot2toreplace.childNodes[1]);
    for (let j = 1; j < mot2toreplace.childNodes.length; j += 2) {
        mot2toreplace.childNodes[j].style = "margin : 0px";
    }
    
    divresult.appendChild(content);
    content.appendChild(mot2final);

    document.getElementsByClassName("mot1")[0].style = "display : none";
    document.getElementsByClassName("mot2")[0].style = "display : none";
}


function gotolink(url) {
    window.open(url, "_blank");
}

function create() {
    Mot1Texte = Mots["Mot1"];
    Mot2Texte = Mots["Mot2"];

    String.prototype.replaceAt = function(index, replacement) {
        if (index >= this.length) {
            return this.valueOf();
        }
     
        return this.substring(0, index) + replacement + this.substring(index + 1);
    }

    if (Mot1Texte[IndexsCaracs[0]] != Mot2Texte[IndexsCaracs[1]]) {
        console.log("Le croisement ne correspond pas ! : " + Mot1Texte[IndexsCaracs[0]] + " et " + Mot2Texte[IndexsCaracs[1]]);
        if (Mot1Texte[IndexsCaracs[0]] == "*" && (Mot2Texte[IndexsCaracs[1]] == "#" || Mot2Texte[IndexsCaracs[1]] == "/")) {
            Mot1Texte = Mot1Texte.replaceAt(IndexsCaracs[0], Mot2Texte[IndexsCaracs[1]]);
        } else if (Mot2Texte[IndexsCaracs[1]] == "*" && (Mot1Texte[IndexsCaracs[0]] == "#" || Mot1Texte[IndexsCaracs[0]] == "/")) {
            Mot2Texte = Mot2Texte.replaceAt(IndexsCaracs[1], Mot1Texte[IndexsCaracs[0]]);
        } else if (Mot1Texte[IndexsCaracs[0]] == "*"){
            Mot1Texte = Mot1Texte.replaceAt(IndexsCaracs[0], Mot2Texte[IndexsCaracs[1]]);
        } if (Mot2Texte[IndexsCaracs[1]] == "*"){
            Mot2Texte = Mot2Texte.replaceAt(IndexsCaracs[1], Mot1Texte[IndexsCaracs[0]]);
        }
        console.log("On arrive donc à : " + Mot1Texte + " | " + Mot2Texte);
    }

    if (Mot1Texte[IndexsCaracs[0]] != Mot2Texte[IndexsCaracs[1]]) {
        document.getElementById("whattodo").textContent = "Les lettres croisées ne correspondent pas";
        document.getElementById("whattodo").style.color = "#eb3349";
        modifytext("1");
        modifytext("2");

        IndexsCaracs = [-1, -1];
        WordsSelected = 0;
    } else {

    
    
    generate();

    

    

    

    


    mot1resultats = distanceHammingSiplyfied(Mot1Texte, 0, "none");
    mot2resultats = distanceHammingSiplyfied(Mot2Texte, 0, "none");
    

    function croisement(mot1, index1, mot2, index2) {

        mots1 = mot1[1]
        mots2 = mot2[1]

        ListeFinale = []

        for (let mot1index = 0; mot1index < mots1.length; mot1index++) {
            caracmot1 = mots1[mot1index][index1];
            for (let mot2index = 0; mot2index < mots2.length; mot2index++) {
                caracmot2 = mots2[mot2index][index2];
                if (caracmot2 == caracmot1) {
                    tuplee = [mots1[mot1index], mots2[mot2index]];
                    ListeFinale.push(tuplee);
                }
            }

        }

        console.log(ListeFinale.length.toString() + " résultats")
        return ListeFinale

    }
    
        

    fin = croisement(mot1resultats, IndexsCaracs[0], mot2resultats, IndexsCaracs[1]);
    console.log(fin);

    

    if (fin.length > 30) {
        document.getElementsByClassName("mot2final")[0].style = ""; 
        document.getElementsByClassName("mot2final")[0].innerHTML = '<h1 style="text-align: center; color : rgb(229, 57, 53);">Il y a trop de combinaisons possibles (' + fin.length.toString() + ')</h1>';
        document.getElementsByClassName('valider')[0].textContent = "Modifier la recherche";
        document.getElementsByClassName('valider')[0].setAttribute('onclick','modifier();');
        
    } else if (fin.length > 0) {
        containerselect = document.getElementsByClassName("result2")[0]

        var h1 = document.createElement('h1');

        if (document.getElementById("lenombre")) {
            elem = document.getElementById("lenombre");
            elem.parentNode.removeChild(elem);
        }
        h1.id = "lenombre";
        if (fin.length == 1) {
            h1.textContent = fin.length.toString() + " croisement trouvé";
        } else {
            h1.textContent = fin.length.toString() + " croisements trouvés";
        }
        
        h1.style = "color : #115099; text-align: center";
        containerRESULTAT = document.getElementsByClassName("mot2final")[0].parentNode;
        containerRESULTAT.prepend(h1);

        var select = document.createElement('select');
        select.id = "resultats";

        
        
        
        containerselect.appendChild(select);
        

        select = document.getElementById('resultats');
        select.innerHTML = "";
        for (var i = 0; i < fin.length; i++){
            var opt = document.createElement('option');
            var texteeeee = fin[i].toString();
            texteeeee = texteeeee.replace(',', ' ');
            opt.value = texteeeee;
            opt.innerHTML = texteeeee;
            select.appendChild(opt);
        }

        seepreview();

        location.href = "#";
        location.href = "#resultats";


        document.getElementById('resultats').setAttribute('onchange','seepreview();');

        
        
        

        document.getElementsByClassName('valider')[0].textContent = "Modifier la recherche";
        document.getElementsByClassName('valider')[0].setAttribute('onclick','modifier();');
    } else {
        document.getElementsByClassName("mot2final")[0].style = ""; 
        document.getElementsByClassName("mot2final")[0].innerHTML = '<h1 style="text-align: center; color : rgb(229, 57, 53);"> Aucun croisement possible</h1>';
        document.getElementsByClassName('valider')[0].textContent = "Modifier la recherche";
        document.getElementsByClassName('valider')[0].setAttribute('onclick','modifier();');
    }

    }
    
}

function modifier() {
    document.getElementById('saisie1').style = "display : block;";
    document.getElementById('buttonvalider1').style = "display : block;";

    document.getElementById('saisie2').style = "display : block;";
    document.getElementById('buttonvalider2').style = "display : block;";

    document.getElementById("whattodo").textContent = "Commencez par choisir deux mots";
    document.getElementById('buttonvalider1').setAttribute('onclick','tobutton1()');
    document.getElementById('buttonvalider2').setAttribute('onclick','tobutton2()');
    WordsSelected = 0;

    document.getElementsByClassName('valider')[0].textContent = "Valider";
    document.getElementsByClassName('valider')[0].setAttribute('onclick','create();');
    document.getElementsByClassName('valider')[0].style = "display : none;";
    IndexsCaracs = [-1, -1];
    elem = document.getElementById("resultats");
    elem.parentNode.removeChild(elem);

    document.getElementById("saisie1").focus();
    whofocus = "saisie1";
}

function modifytext(lequel) {
    if (WordsSelected != 0) {
        WordsSelected -= 1;
    }
    console.log(WordsSelected);

    
    
    document.getElementById("whattodo").textContent = "Commencez par choisir deux mots";

    id = "saisie" + lequel;
    document.getElementById(id).style = "display : block";
    elem = document.getElementsByClassName("ligne mot" + lequel)[0];
    elem.parentNode.removeChild(elem);
    document.getElementById("buttonvalider" + lequel).textContent = "Ok";
    document.getElementById("buttonvalider" + lequel).style = "background-color : #115099";

    if (lequel == "1") {
        document.getElementById("buttonvalider" + lequel).setAttribute('onclick', 'tobutton1()');
    } else {
        document.getElementById("buttonvalider" + lequel).setAttribute('onclick', 'tobutton2()');
    }
    
    
}



function createit(mot, lequel) {

    if (document.getElementsByClassName("mot" + lequel).length > 0) {
        elem = document.getElementsByClassName("mot" + lequel)[0]
        elem.parentNode.removeChild(elem);
    }

    containere = document.getElementsByClassName("saisiee" + lequel)[0];

    var container = document.createElement('div');
    container.className = "ligne mot" + lequel;

    containere.prepend(container);

    texte = mot
    taille = texte.length;

    for (let i = 0; i < taille; i ++) {
        var btn = document.createElement('button');
        btn.id = lequel + "-"+(i + 1).toString();
        btn.textContent = texte[i];
        btn.setAttribute('onclick','selectcase(this.id);');
        if (i == 0) {
            btn.className = "case case-left";
            //btn.style = "margin-left : 20px"
        } else if (i == taille - 1) {
            btn.className = "case case-right";
        } else {
            btn.className = "case";
        }
        
        container.appendChild(btn);
    }

    document.getElementById("saisie" + lequel).style = "display : none";
    document.getElementById("buttonvalider" + lequel).textContent = "Modifier";
    document.getElementById("buttonvalider" + lequel).style = "background:linear-gradient(90deg, #4776e6 0%,#8e54e9 100% );";
    
    
    

    document.getElementById("buttonvalider" + lequel).setAttribute('onclick','modifytext(' + lequel +')');
    WordsSelected += 1;
    
    console.log(WordsSelected);

    if (WordsSelected == 2) {
        
        document.getElementById("whattodo").textContent = "Cliquez sur les cases sur lesquelles les mots se croisent";
        document.getElementById("whattodo").style.color = "#115099";
        
    }
}




function tobutton1(){


    texte = document.getElementById("saisie1").value.toUpperCase();

    Mots["Mot1"] = texte;


    createit(texte, "1");
    

    

}

function tobutton2(){

    texte = document.getElementById("saisie2").value.toUpperCase();
    Mots["Mot2"] = texte

    createit(texte, "2");
    

}

function seepreview() {
    valeur = document.getElementById("resultats").value;
    mot1 = valeur.split(' ')[0];
    mot2 = valeur.split(' ')[1];

    

    createit(mot1, "1");
    createit(mot2, "2");

    generate();

    lemot2 = document.getElementsByClassName("mot2final")[0];
    console.log(lemot2.childNodes.length)
    urlmot2 = 'https://www.larousse.fr/dictionnaires/francais/' + valeur.split(' ')[1];
    urlmot1 = 'https://www.larousse.fr/dictionnaires/francais/' + valeur.split(' ')[0];
    for (var i = 0; i < lemot2.childNodes.length; i++){
        var btn = lemot2.childNodes[i];
        if (i != IndexsCaracs[1]) { 
            chaine = 'gotolink("' + urlmot2 + '")'
            btn.setAttribute("onclick", chaine);
        } else {
            chaine = 'gotolink("' + urlmot1 + '")'
            btn.setAttribute("onclick", chaine);
        }    
    }
}


function basicfocus(){
    var path = window.location.pathname;
    var page = path.split("/").pop();

    if (page == "croisement.html") {
        whofocus = "saisie1";
    }
    if (page == "index.html") {
        whofocus = "saisie";
    }

}

basicfocus();



function deletetext(idsaisie) {
    document.getElementById(idsaisie).value = "";
    document.getElementById(idsaisie).focus();

    if (document.getElementsByClassName("ask")) {
        elem = document.getElementsByClassName("ask")[0];
        elem.parentNode.removeChild(elem);
        document.getElementsByClassName("result")[0].style = "display : block";

        
        document.getElementById("saisie").removeAttribute('readonly');
        document.getElementById("saisie").focus();

        

        var validerbuttonleft = document.getElementsByClassName("valider")[0];
        validerbuttonleft.style = "background-color : #11998e; cursor : pointer";
        validerbuttonleft.disabled = false;
        
       
    }
}

function deletetextlist(listid) {
    for (let i = 0; i < listid.length; i ++) {
        idsaisie = listid[i];
        document.getElementById(idsaisie).value = "";
    }

    document.getElementById(listid[0]).focus();
    
}

let matrice = []

function checktext() {
    parent = document.getElementById("tableau").childNodes;
    for (let divs = 1; divs < parent.length; divs++) {
        for (let elindex = 1; elindex < parent[divs].childNodes.length; elindex++) {
            if (parent[divs].childNodes[elindex].value == "-") {
                parent[divs].childNodes[elindex].style.backgroundColor = "black";
            } else {
                if (matrice[divs - 1][elindex - 1] != parent[divs].childNodes[elindex].value) {
                    matrice[divs - 1][elindex - 1] = parent[divs].childNodes[elindex].value.toUpperCase();
                }
                parent[divs].childNodes[elindex].style.backgroundColor = "white";
            }
        }
    }
    //console.log(matrice);

}

function resettable() {
    elem = document.getElementById("tableau");
    elem.parentNode.removeChild(elem);

    createtable(15)
}

function decaltext(elem, taille){

    TailleX = taille[0]
    TailleY = taille[1];
    
    for (let i = elem.parentNode.childNodes.length - 1; i > 1 ; i -= 1) {
        elem.parentNode.childNodes[i].value = elem.parentNode.childNodes[i - 1].value
    }

    matrice = []
    for (let y = 1; y < TailleY + 1; y++) {
        matrice.push([]);
        for (let x = 1; x < TailleX + 1; x++) {
            matrice[y - 1].push(parent[y].childNodes[x]);
        }

    }
}

function decaltextenbas(elem, taille){

    TailleX = taille[0]
    TailleY = taille[1];

    parent = document.getElementById("tableau").childNodes;

    mparent = elem.parentNode.childNodes;
    index = -1;
    for (let i = 0; i < mparent.length ; i++) {
        if (mparent[i] == elem) {
            index = i + 1;
        }
    }
    
    for (let i = parent.length - 3; i > 2 ; i -= 1) {
        parent[i].childNodes[index].value = parent[i - 1].childNodes[index].value;
    }

    matrice = []
    for (let y = 1; y < TailleY + 1; y++) {
        matrice.push([]);
        for (let x = 1; x < TailleX + 1; x++) {
            matrice[y - 1].push(parent[y].childNodes[x]);
        }

    }

    
}






function createtable(taille) {
    var nombre;
    if (document.getElementById("saisiedim").value != "") {
        
        chaine = document.getElementById("saisiedim").value;
        
        if (chaine.includes("X")) {
            nombre = chaine.split('X');

        } else if (chaine.includes("x")) {
            nombre = chaine.split('x');

        } else if (chaine.includes(" ")) {
            nombre = chaine.split(' ');

        } else if (chaine.includes("*")) {
            nombre = chaine.split('*');

        } else {
            nombre = [chaine, chaine];
        }

        for (el in nombre) {
            nombre[el] = parseInt(nombre[el]);
        }

        
        
    }

    if (nombre == null) {
        nombre = [taille, taille]
    }

    console.log(nombre);

    TailleY = nombre[1];
    TailleX = nombre[0];

    var body = document.getElementsByTagName("body")[0];
    var tableau = document.createElement("table");
    tableau.id = "tableau";
    tableau.style = "margin-top : 50px;";
    
    
    taillecase = 2.4;
    taillepolice= 2.4;



    taillecase = taillecase.toString();
    for (let y = 0; y < TailleY + 1; y++) {
        var row = document.createElement("div");
        row.style = "display : flex; width : fit-content";
        if (y == 0) {
            row.style = "display : flex; width : fit-content; margin-left : 4vh";
            if (window.matchMedia("only screen and (hover: none) and (pointer: coarse)").matches) {
                row.style.marginLeft = "2vh";
                

            }
        } else {
            matrice.push([]);
        }
        for (let x = 0; x < TailleX + 1; x++) {
            if (y == 0) {
                var cell = document.createElement("input");
                cell.type = "text";
                cell.style = "background-color : #bdbeb6; color: black; border : 0px; border-radius : 0px; overflow:hidden; height : auto; text-align : center; padding : 0px; width : 4vh; padding : 5px; border : 1px solid #bdbeb6; cursor : pointer";
                if (window.matchMedia("only screen and (hover: none) and (pointer: coarse)").matches) {
                    cell.style.width = taillecase + "vh";
                    cell.style.fontSize = taillepolice + "vh";
                    
                }
                cell.readOnly = true;
                idcool = "hautscases" + (x+1).toString();
                cell.id = idcool
                cell.value = (x+1).toString();
                if (x != TailleX) {
                    row.appendChild(cell);
                    cell.setAttribute('onclick','decaltextenbas(' + idcool +  ',' + nombre + ' )');
                }


            } else if (x == 0) {
                var cell = document.createElement("input");
                cell.type = "text";
                cell.style = "background-color : #bdbeb6; color: black; border : 0px; border-radius : 0px; overflow:hidden; height : auto; text-align : center; padding : 0px; width : 4vh; cursor : pointer";
                if (window.matchMedia("only screen and (hover: none) and (pointer: coarse)").matches) {
                    cell.style.width = taillecase + "vh";
                    cell.style.fontSize = taillepolice + "vh";
                }
                cell.readOnly = true;
                cell.value = (y).toString();
                idcool = "leftCases" + y.toString();
                cell.id = idcool
                row.appendChild(cell); 
                //cell.addEventListener("click", decaltext(cell) );
                cell.setAttribute('onclick','decaltext(' + idcool +  ')');
            } else {
                var cell = document.createElement("input");
                cell.type = "text";
                cell.style = "background-color : white; border : 1px solid black; border-radius : 0px; overflow:hidden; height : auto; padding : 5px; width : 4vh; height : 4vh; text-align : center; text-transform: capitalize;";
                if (window.matchMedia("only screen and (hover: none) and (pointer: coarse)").matches) {
                    cell.style.width = taillecase + "vh";
                    cell.style.fontSize = taillepolice + "vh";
                }
                cell.maxLength="1";
                
                cell.addEventListener("focusout", checktext);
                cell.tabIndex = y * TailleY + x;
                id = (y * TailleY + x).toString();
                
                matrice[y - 1].push("");
                //cell.setAttribute("onclick", 'checktext()')
                row.appendChild(cell);

                

            }
            
        }
        tableau.appendChild(row)
    }
    body.appendChild(tableau);

    location.href = "#";
    location.href = "#tableau";
    
    divfinal = document.createElement("button")
    divfinal.id = "validerlagrille";
    divfinal.textContent = "Valider";
    divfinal.className = "valider";
    divfinal.style = "position: absolute;top: 150%; left: 10%;";


    

    reseter = document.createElement("button")
    reseter.id = "resetlagrille";
    reseter.textContent = "Réinitialiser la grille";
    reseter.className = "valider";
    reseter.style = "position: absolute;top: 160%; left: 15px; background-color : #e53935";

    if (window.matchMedia("only screen and (hover: none) and (pointer: coarse)").matches) {

        divfinaleeee = document.createElement("div");
        divfinaleeee.style = "display: flex; flex-direction : column; justify-content : center; text-align : center";
        document.getElementsByTagName("body")[0].appendChild(divfinaleeee);
        divfinal.style = "";
        divfinaleeee.appendChild(divfinal);
        reseter.style = "background-color : #e53935";
        divfinaleeee.appendChild(reseter);

    } else {
        document.getElementById("tableau").appendChild(divfinal);
        document.getElementById("tableau").appendChild(reseter);
    }
    
    document.getElementById("validerlagrille").setAttribute('onclick','mainMotcroise4()');
    
    document.getElementById("resetlagrille").setAttribute('onclick','resettable()');
    


    
}

document.onkeydown  = function (e) {
    var path = window.location.pathname;
    var page = path.split("/").pop();

    if (page == "croise4mots.html") {
        e = e || window.event;

        function nefocus(nouveauindex){
            document.getElementById("tableau");
           elactuel = document.activeElement;
           ntabindex = nouveauindex;

           diference = nouveauindex - document.activeElement.tabIndex;
           complicated = false;
           if (diference > 14 || diference < -14)
            complicated = true;
           

           if (complicated) {
            parent = elactuel.parentNode.parentNode.childNodes;
            for (let divs = 0; divs < parent.length; divs++) {
                for (let elindex = 0; elindex < parent[divs].childNodes.length; elindex++) {
                    if (parent[divs].childNodes[elindex].tabIndex == ntabindex) {
                        parent[divs].childNodes[elindex].focus();
                    }
                }
            }
            
           } else {
            parent = elactuel.parentNode.childNodes;
            for (let elindex = 0; elindex < parent.length; elindex++) {
                if (parent[elindex].tabIndex == ntabindex) {
                    parent[elindex].focus();
                }
            }
           }
           
        }
        
        function addCaractere(carac) {
            function insertAtCursor(myField, myValue) {
                
                if (document.selection) {
                }
                else if (myField.selectionStart || myField.selectionStart == '0') {
                    var startPos = myField.selectionStart;
                    var endPos = myField.selectionEnd;
                    if (myField.value[startPos] == undefined) {
                        nefocus(document.activeElement.tabIndex + 1)
                    }
                } else {
                    nefocus(document.activeElement.tabIndex + 1)  
                }  
            }
            insertAtCursor(document.activeElement, carac);  
        }
        
        
        if (e.keyCode >= '65' && e.keyCode <= '90' && document.activeElement.value != "" ) {
            addCaractere(e.key);
            //nefocus(document.activeElement.tabIndex + 1)
        }

        

        if ((e.keyCode == '106' || e.keyCode == '111' || e.keyCode == '51') && document.activeElement.value != "") {
            addCaractere(e.key);

            
            
            
        }




        if (e.keyCode == '8' && document.activeElement.value == "") {
            nefocus(document.activeElement.tabIndex - 1)
        }
        
        if (e.keyCode == '39') {
           nefocus(document.activeElement.tabIndex + 1)
        }
        if (e.keyCode == '37') {
            nefocus(document.activeElement.tabIndex - 1)
         }
         if (e.keyCode == '38') {
            nefocus(document.activeElement.tabIndex - 15)
         }
         if (e.keyCode == '40') {
            nefocus(document.activeElement.tabIndex + 15)
         }
    }
    
    // use e.keyCode
};



function getwords(dimensions) {
    console.log(matrice);
    MotsHorrizontaux = [];
    begin = "";
    
    for (let y = 0; y < dimensions; y++) { 
        begin = ""
        FirstWordDetector = false;
        for (let x = 0; x < dimensions; x++) { 
            
            if (FirstWordDetector == true) {
                if (x + 1 < dimensions) {
                    begin += matrice[y][x];
                    if (matrice[y][x + 1] == "" || matrice[y][x + 1] == "-") {
                        if (begin.length >= 3) {
                            tuplee = [[x - begin.length + 1, y], begin];
                            MotsHorrizontaux.push(tuplee);
                        }    
                        begin = ""
                        FirstWordDetector = false;
                    }
                } else {
                    if (matrice[y][x] != "" || matrice[y][x] != "-") {
                        begin +=  matrice[y][x]
                        if (begin.length >= 3) {
                            tuplee = [[x - begin.length + 1, y], begin];
                            MotsHorrizontaux.push(tuplee);
                        }    
                        begin = ""
                        FirstWordDetector = false
                    }
                }
                

            } else if ( (matrice[y][x] != "" || matrice[y][x] != "-") && FirstWordDetector == false) {
                if (x + 1 < dimensions) {
                    if (matrice[y][x + 1] != "" || matrice[y][x + 1] != "-") {
                        FirstWordDetector = true;
                        begin += matrice[y][x];
                    }
                        
                }

            }
        }
    }

    console.log("Mots Horrizontaux :", MotsHorrizontaux);

    MotsVerticaux = [];
    begin = ""
    FirstWordDetector = false;
    
    for (let x = 0; x < dimensions; x++) { 
        begin = ""
        FirstWordDetector = false;
        for (let y = 0; y < dimensions; y++) { 
            if (matrice[y][x] == "R") {
                console.log("heee")
            }
            if (FirstWordDetector == true) {
                if (y + 1 < dimensions) {
                    begin += matrice[y][x];
                    if (matrice[y + 1][x] == "" || matrice[y + 1][x] == "-") {
                        if (begin.length >= 3) {
                            tuplee = [[x, y - begin.length + 1], begin];
                            MotsVerticaux.push(tuplee);
                        }    
                        begin = ""
                        
                    }
                } else {
                    if (matrice[y][x] != "" || matrice[y][x] != "-") {
                        begin +=  matrice[y][x]
                        if (begin.length >= 3) {
                            tuplee = [[x, y - begin.length + 1], begin];
                            MotsVerticaux.push(tuplee);
                        }    
                        begin = ""
                        FirstWordDetector = false
                    }
                }
                

            } else if ( (matrice[y][x] != "" || matrice[y][x] != "-") && FirstWordDetector == false) {
                if (y + 1 < dimensions) {
                    if (matrice[y + 1][x] != "" || matrice[y + 1][x] != "-") {
                        FirstWordDetector = true;
                        begin += matrice[y][x];
                    }
                        
                }

            }
        }
    }
    console.log("Mots Verticaux :", MotsVerticaux);
    
    return [MotsHorrizontaux, MotsVerticaux]

}
function main(resultat) {
    
    elem = document.getElementsByClassName('ask')[0];
    if (elem) {
        elem.parentNode.removeChild(elem);
    }

    resultat = resultat.toUpperCase()
    
    taille = resultat.length;
    var file =  localStorage.getItem(taille);

    if (file == null) {
        //problem("Mot trop long (" + taille.toString() + " / 21 lettres)");
        return "error";
    } else {
        file = file.split(',');
    }
    let mots = file
    function distanceHamming2(motatrouver, diff, error) {
        var ObligatoiresIndex = [];
        var InterditsIndex = [];
        var touslesmots = []
        var attention = ["*", " "];
        var special = {"/" : ["A", "E", "I", "O", "U", "Y"], "#" : [ "B", "C", "D", "F", "G", "H", "J", "K", "L", "M", "N", "P", "Q", "R", "S", "T", "V", "W", "X", "Z"]};
        scoremin = 0
        for (let lettre = 0; lettre < motatrouver.length; lettre++) {
            if (attention.includes(motatrouver[lettre])) {
                scoremin++;
            }
        }
        for (let motindex = 0; motindex < mots.length; motindex++) {
            var line = mots[motindex];
            var score = 0;
            for (let charac = 0; charac < line.length; charac++) {
                if (line[charac] != motatrouver[charac]) {
                    if ( Object.keys(special).includes(motatrouver[charac])) {
                        if (special[motatrouver[charac]].includes(line[charac])) {
                            
                        } else {
                            score++;
                        }
                    } else if (Object.keys(InterditsOuObligatoires).includes(motatrouver[charac])) {
                        if (motatrouver[charac] == "&") {
                            indexducarac = InterditsIndex.indexOf(charac);
                            if (InterditsOuObligatoires["&"][indexducarac].includes(line[charac])) {
                                score++;
                            }
                                
                        } else {
                            indexducarac = ObligatoiresIndex.indexOf(charac);
                            if (InterditsOuObligatoires["@"][indexducarac].includes(line[charac])) {
   
                            } else {
                                score++;
                            }

                        }
                    } else {
                        score++;
                    }
                    
                }
            }
            var tuplee = [score, line]; 
            touslesmots.push(tuplee);
        }
     
        var filtre = touslesmots.sort();
        console.log(filtre);
        var Minimum = diff;
        var max = scoremin + Minimum;
        var listefinale = [];
        for (let i = 0; i < filtre.length; i++) {
            if (filtre[i][0] <= max) {
                listefinale.push(filtre[i][1]);
            }
        }

        console.log(listefinale);

        if (listefinale.length == 0) {
            error = "pasdupremiercoup";
            //return distanceHamming2(motatrouver, diff + 1, error)
            return [];
        } else {
            return listefinale;
        }
    }

    return [resultat, distanceHamming2(resultat, 0, "none")];
}

function trouvecroisement(lesmots) {
    MotsHorrizontaux = lesmots[0];
    MotsVerticaux = lesmots[1];

    Intersections = [];
    for (motHoriindex in MotsHorrizontaux) {
       
        for (motvertiindex in MotsVerticaux) {
            for (let y = 0; y < MotsVerticaux[motvertiindex][1].length; y++) { 
                vraiy = MotsVerticaux[motvertiindex][0][1] + y;
                if (vraiy == MotsHorrizontaux[motHoriindex][0][1]) {
                    coord = (MotsVerticaux[motvertiindex][0][0], vraiy)
                    
                    indexmot1 = MotsVerticaux[motvertiindex][0][0] - MotsHorrizontaux[motHoriindex][0][0] + 1;
                    
                    indexmot2 = vraiy - MotsVerticaux[motvertiindex][0][1] + 1;
                    

                    letuple = [main(MotsHorrizontaux[motHoriindex][1]), indexmot1, main(MotsVerticaux[motvertiindex][1]), indexmot2]

                    Intersections.push(letuple)
                }
            }
                    
        }
    }
    
                    
    return Intersections
}

let indexlistealire = 0;

function mainMotcroise4(){
    mots = getwords(15);
    console.log(mots);
    croisements = trouvecroisement(mots);
    console.log(croisements);
    
    function croisement(GrandTuple) {
        mot1 = GrandTuple[0]
        index1 = GrandTuple[1]
        mot2 = GrandTuple[2]
        index2 = GrandTuple[3]

        index1 -= 1
        index2 -= 1

        mots1 = mot1[1]
        mots2 = mot2[1]

        ListeFinale = []

        for (mot1index in mots1) {
            caracmot1 = mots1[mot1index][index1]
            for (mot2index in mots2) {
                caracmot2 = mots2[mot2index][index2]
                if (caracmot2 == caracmot1) {
                    tuplee = [mots1[mot1index], mots2[mot2index]];
                    ListeFinale.push(tuplee);
                }
                    
            }
        }
                    
        console.log(ListeFinale.length, "résultats")
        return ListeFinale
    }

    Intersections = croisements;

    mot1mot2 = croisement(Intersections[0])
    console.log(mot1mot2)

    mot1mot4 = croisement(Intersections[1])
    console.log(mot1mot4)

    mot3mot2 = croisement(Intersections[2])
    console.log(mot3mot2)

    mot3mot4 = croisement(Intersections[3])
    console.log(mot3mot4)

    function commun(ListeI, ListeII, indexcompareI, indexcompareII) {
        ListeFinale = [];
        score = 0;
        for (let i = 0; i < ListeI.length; i++ ) {
            for (let j = 0; j < ListeII.length; j++ ) {

                
                listeISTR = JSON.stringify(ListeI[i][indexcompareI]);
                listeIISTR = JSON.stringify(ListeII[j][indexcompareII]);
                
                
                
                if (listeISTR == listeIISTR) {
                    score += 1
                    if (indexcompareI == 0 &&  indexcompareII == 0) {
                        tuplee = [ListeI[i][indexcompareI], ListeI[i][indexcompareI - 1], ListeII[j][indexcompareII - 1]];
                    }
                        
                    else if(indexcompareI == 0 &&  indexcompareII == 1) {
                        tuplee = [ListeI[i][indexcompareI], ListeI[i][indexcompareI - 1], ListeII[j][indexcompareII - 1]];
                    }
                        
                    else if (indexcompareI == 1 &&  indexcompareII == 0) {
                        tuplee = [ListeI[i][indexcompareI], ListeI[i][indexcompareI - 1], ListeII[j][indexcompareII - 1]];
                    }
                        
                    else {
                        
                        tuplee = [ListeI[i][indexcompareI], ListeI[i][indexcompareI - 1], ListeII[j][indexcompareII - 1]];
                    }

                    ListeFinale.push(tuplee)
                    
                }
            }
        }
   
        console.log(score);
        return ListeFinale
    }

    console.log("-------------------------------------");
    mot1mot2mot3 = commun(mot1mot2, mot3mot2, 1, 1);
    mot1mot3mot4 = commun(mot1mot4, mot3mot4, 1, 1);

    console.log(mot1mot2mot3);
    console.log("&&&&&&&&&&&&&&&&&&&&&&&&&&&&&&&&&&&&&&&&&&&&&&&&&&&&&&");
    console.log(mot1mot3mot4);

    function communfinal(ListeI, ListeII, indexcompareI, indexcompareII) {
        ListeFinale = []
        score = 0
        for (let i = 0; i < ListeI.length; i++ ) {
            for (let j = 0; j < ListeII.length; j++ ) {
                if (JSON.stringify(ListeI[i][indexcompareI]) == JSON.stringify(ListeII[j][indexcompareII])) {

                    passed = ListeI[i].concat(ListeII[j]);
                    
                    tuplee = [];
                    for (let motindex = 0; motindex < passed.length; motindex++ ) {
                        if (tuplee.includes(passed[motindex])) {
                            
                        } else {
                            tuplee.push(passed[motindex]);
                        }
                    }
                    

                    tuplee2 = (tuplee).sort()

                    if (ListeFinale.includes(tuplee2)) {
                        break
                    }

                    console.log(tuplee);


                    tuplefinalo = []
                    compteurmots = 1;

                    if (tuplee.length == 4) {
                        for (let i = 0; i < tuplee.length; i++ ) {
                            for (let motindex = 0; motindex < tuplee.length; motindex++ ) {
                                if (compteurmots == 1 && Intersections[0][0][1].includes(tuplee[motindex])) {
                                    tuplefinalo.push(tuplee[motindex]);
                                    compteurmots += 1;
                                    break;
                                }
                                if (compteurmots == 2 && Intersections[0][2][1].includes(tuplee[motindex])) {
                                    tuplefinalo.push(tuplee[motindex]);
                                    compteurmots += 1;
                                    break;
                                }
                                if (compteurmots == 3 && Intersections[2][0][1].includes(tuplee[motindex])) {
                                    tuplefinalo.push(tuplee[motindex]);
                                    compteurmots += 1;
                                    break;
                                }
                                if (compteurmots == 4 && Intersections[1][2][1].includes(tuplee[motindex])) {
                                    tuplefinalo.push(tuplee[motindex]);
                                    compteurmots += 1;
                                    break;
                                }

                            }
                        }
                        score += 1
                        ListeFinale.push(tuplefinalo);
                    }
                    
                    //console.log(tuplefinalo);

                    /*
                    oldtuple1 = tuplee[1];
                    tuplee[1] = tuplee[0];
                    tuplee[0] = oldtuple1;
                    
                    console.log(tuplee);
                    */
                    

                    
                        
                }
            }
        }

        console.log(score)
        return ListeFinale
    }

    console.log("-------------------------------------")
    let final = communfinal(mot1mot2mot3, mot1mot3mot4, 1, 1);

    console.log(final)
    console.log(final.length, "résultats");
    if (window.matchMedia("only screen and (hover: none) and (pointer: coarse)").matches) {

        divfinaleeee = document.createElement("div");
        divfinaleeee.style = "display: flex; justify-content : center; text-align : center; flex-direction : column";
        document.getElementsByTagName("body")[0].appendChild(divfinaleeee)


        if (final.length == 0) {
            textecool = document.createElement("h1")
            textecool.id = "letitre";
            textecool.style = " color : #115099; font-size : 3vh";
            textecool.textContent = "Il y a aucun croisement possible";
            textecool.style.color = "rgb(229, 57, 53)";
            textecool.style.color.over;
            divfinaleeee.appendChild(textecool);
            location.href = "";
            location.href = "#letitre";
        } else {
            
            previewresultatfinal4mots(final[indexlistealire], mots);
        
            buttonnext = document.createElement("button")
            buttonnext.id = "nextateur";
            buttonnext.textContent = "Suivant";
            buttonnext.className = "internet";
        
            if (document.getElementById("nextateur")) {
                elem = document.getElementById("nextateur");
                elem.parentNode.removeChild(elem);
            }
        
            divfinaleeee.appendChild(buttonnext);
        
            textecool = document.createElement("h1")
            textecool.id = "letitre";
            textecool.style = "color : #115099; font-size : 3vh";
            if (final.length == 1) {
                textecool.textContent = "Il y a 1 croisement possible";
            } else {
                textecool.textContent = "Il y a " + final.length.toString() + " croisements possibles";
            }
        
            if (document.getElementById("letitre")) {
                elem = document.getElementById("letitre");
                elem.parentNode.removeChild(elem);
            }
        
            divfinaleeee.appendChild(textecool);
        
            textecool2 = document.createElement("h1")
            textecool2.id = "statuseeee";
            textecool2.style = "color : #115099; font-size : 3vh";
            textecool2.textContent = "1 / " + final.length.toString();
        
            if (document.getElementById("statuseeee")) {
                elem = document.getElementById("statuseeee");
                elem.parentNode.removeChild(elem);
            }
        
            divfinaleeee.appendChild(textecool2);
        
            document.getElementById("nextateur").addEventListener("click", next.bind(null,final, mots));  
        }

    } else {
        if (final.length == 0) {
            textecool = document.createElement("h1")
            textecool.id = "letitre";
            textecool.style = "position: absolute;top: 140%; right: 5%; color : #115099; font-size : 3vh";
            textecool.textContent = "Il y a aucun croisement possible";
            textecool.style.color = "rgb(229, 57, 53)";
            textecool.style.color.over;
            document.getElementById("tableau").appendChild(textecool);
        } else {
        
        
        previewresultatfinal4mots(final[indexlistealire], mots);
    
        buttonnext = document.createElement("button")
        buttonnext.id = "nextateur";
        buttonnext.textContent = "Suivant";
        buttonnext.className = "internet";
        buttonnext.style = "position: absolute;top: 150%; right: 10%;";
    
        if (document.getElementById("nextateur")) {
            elem = document.getElementById("nextateur");
            elem.parentNode.removeChild(elem);
        }
    
        document.getElementById("tableau").appendChild(buttonnext);
    
        textecool = document.createElement("h1")
        textecool.id = "letitre";
        textecool.style = "position: absolute;top: 140%; right: 5%; color : #115099; font-size : 3vh";
        if (final.length == 1) {
            textecool.textContent = "Il y a 1 croisement possible";
        } else {
            textecool.textContent = "Il y a " + final.length.toString() + " croisements possibles";
        }
    
        if (document.getElementById("letitre")) {
            elem = document.getElementById("letitre");
            elem.parentNode.removeChild(elem);
        }
    
        document.getElementById("tableau").appendChild(textecool);
    
        textecool2 = document.createElement("h1")
        textecool2.id = "statuseeee";
        textecool2.style = "position: absolute;top: 145%; right: 5%; color : #115099; font-size : 3vh";
        textecool2.textContent = "1 / " + final.length.toString();
    
        if (document.getElementById("statuseeee")) {
            elem = document.getElementById("statuseeee");
            elem.parentNode.removeChild(elem);
        }
    
        document.getElementById("tableau").appendChild(textecool2);
       
        document.getElementById("nextateur").addEventListener("click", next.bind(null,final, mots));  
        }
    }
    
        
}

function previewresultatfinal4mots(liste, initial) {
    console.log(liste);
    console.log(initial);
    mot1 = initial[0][0]
    mot2 = initial[1][0]
    mot3 = initial[0][1]
    mot4 = initial[1][1]

    function setmotingrillehori(listedemots, mot) {
        mot = mot - 1;
        console.log(listedemots);
        tableau = document.getElementById("tableau").childNodes;
        for (let i = 0; i < listedemots[1].length; i++ ) {
            inputamodif = tableau[listedemots[0][1] + 1].childNodes[listedemots[0][0] + 1 + i];
            console.log(inputamodif.value, liste[mot][i]);
            inputamodif.value = liste[mot][i];
        }
    }

    function setmotingrilleverti(listedemots, mot) {
        mot = mot - 1;
        console.log(listedemots);
        tableau = document.getElementById("tableau").childNodes;
        for (let i = 0; i < listedemots[1].length; i++ ) {
            inputamodif = tableau[listedemots[0][1] + 1 + i].childNodes[listedemots[0][0] + 1];
            console.log(inputamodif.value);
            inputamodif.value = liste[mot][i];
        }
    }

    setmotingrillehori(mot1, 1);
    setmotingrilleverti(mot2, 2);
    setmotingrillehori(mot3, 3);
    setmotingrilleverti(mot4, 4);
 
}

function next(final, mots) {
    indexlistealire++;
    
    if (indexlistealire + 1 > final.length) {
        indexlistealire = 0;
    }
    document.getElementById("statuseeee").textContent = (indexlistealire + 1).toString() + " / " + final.length.toString();
    previewresultatfinal4mots(final[indexlistealire], mots);
    
}
        
