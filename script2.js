if (window.matchMedia("only screen and (hover: none) and (pointer: coarse)").matches) {
    alert('GIGA GIGA NICE !')
}


// First we get the viewport height and we multiple it by 1% to get a value for a vh unit
let vh = window.innerHeight * 0.01;
// Then we set the value in the --vh custom property to the root of the document
document.documentElement.style.setProperty('--vh', `${vh}px`);
window.addEventListener('resize', () => {
  // We execute the same script as before
  let vh = window.innerHeight * 0.01;
  document.documentElement.style.setProperty('--vh', `${vh}px`);
});

let matrice = [["", "", "", "", "", "", "", "", "", "", "", "", "", "", ""],
["", "", "", "", "", "", "", "", "", "", "", "", "", "", ""],
["", "", "", "", "", "", "", "", "", "", "", "", "", "", ""],
["", "", "", "", "", "", "", "", "", "", "", "", "", "", ""],
["", "", "", "", "", "", "", "", "", "", "", "", "", "", ""],
["", "", "", "", "", "", "", "", "", "", "", "", "", "", ""],
["", "", "", "", "", "", "", "", "", "", "", "", "", "", ""],
["", "", "", "A", "B", "A", "T", "T", "O", "I", "R", "", "", "", ""],
["", "", "", "V", "", "", "", "A", "", "", "", "", "", "", ""],
["", "", "", "I", "", "", "", "P", "", "", "", "", "", "", ""],
["", "", "", "O", "N", "I", "R", "I", "Q", "U", "E", "", "", "", ""],
["", "", "", "N", "", "", "", "", "", "", "D", "E", "N", "T", ""],
["", "", "", "", "", "", "", "", "", "", "E", "", "", "", ""],
["", "", "", "", "", "", "", "", "", "", "N", "", "", "", ""],
["", "", "", "", "", "", "", "", "", "", "", "", "", "", ""]]


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
    
    for (let i = elem.parentNode.childNodes.length - 1; i > 1 ; i -= 1) {
        elem.parentNode.childNodes[i].value = elem.parentNode.childNodes[i - 1].value
    }

    matrice = []
    for (let y = 1; y < taille + 1; y++) {
        matrice.push([]);
        for (let x = 1; x < taille + 1; x++) {
            matrice[y - 1].push(parent[y].childNodes[x]);
        }

    }
}

function decaltextenbas(elem, taille){
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
    for (let y = 1; y < taille + 1; y++) {
        matrice.push([]);
        for (let x = 1; x < taille + 1; x++) {
            matrice[y - 1].push(parent[y].childNodes[x]);
        }

    }

    
}




function createtable(taille) {
    var body = document.getElementsByTagName("body")[0];
    var tableau = document.createElement("table");
    tableau.id = "tableau";
    tableau.style = "margin-top : 50px;";
    
    for (let y = 0; y < taille + 1; y++) {
        var row = document.createElement("div");
        row.style = "display : flex; width : fit-content";
        if (y == 0) {
            row.style = "display : flex; width : fit-content; margin-left : 4vh";
        } else {
            
        }
        for (let x = 0; x < taille + 1; x++) {
            if (y == 0) {
                var cell = document.createElement("input");
                cell.type = "text";
                cell.style = "background-color : #bdbeb6; color: black; border : 0px; border-radius : 0px; overflow:hidden; height : auto; text-align : center; padding : 0px; width : 4vh; padding : 5px; border : 1px solid #bdbeb6; cursor : pointer";
                cell.readOnly = true;
                idcool = "hautscases" + (x+1).toString();
                cell.id = idcool
                cell.value = (x+1).toString();
                if (x != taille) {
                    row.appendChild(cell);
                    cell.setAttribute('onclick','decaltextenbas(' + idcool +  ',' + taille + ' )');
                }


            } else if (x == 0) {
                var cell = document.createElement("input");
                cell.type = "text";
                cell.style = "background-color : #bdbeb6; color: black; border : 0px; border-radius : 0px; overflow:hidden; height : auto; text-align : center; padding : 0px; width : 4vh; cursor : pointer";
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
                cell.maxLength="1";
                cell.value = matrice[y - 1][x - 1];
                cell.addEventListener("focusout", checktext);
                cell.tabIndex = y * taille + x;
                id = (y * taille + x).toString();
                
                ;
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
    divfinal.style = "position: absolute;top: 200%; left: 45%;";


    document.getElementById("tableau").appendChild(divfinal);

    document.getElementById("validerlagrille").setAttribute('onclick','mainMotcroise4()');

    reseter = document.createElement("button")
    reseter.id = "resetlagrille";
    reseter.textContent = "Réinitialiser la grille";
    reseter.className = "valider";
    reseter.style = "position: absolute;top: 220%; left: 35%; background-color : #e53935";


    document.getElementById("tableau").appendChild(reseter);

    document.getElementById("resetlagrille").setAttribute('onclick','resettable()');
    


    
}

document.onkeydown  = function (e) {
    var path = window.location.pathname;
    var page = path.split("/").pop();

    if (page == "croisedesmots.html") {
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

        if (listefinale.length == 0) {
            error = "pasdupremiercoup";
            return distanceHamming2(motatrouver, diff + 1, error)
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
    console.log(matrice);
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
    function inters(liste) {
        listefinale = [];
        for (el in liste) {
            listefinale.push(liste[el]);
        }

        return listefinale;
    }

    console.log("--------------------------------------------");
    console.log("Intersections en liste");
    listedespremiersresultats = inters(Intersections);
    console.log(listedespremiersresultats);

    console.log("--------------------------------------------");
    
    mot1mot2 = croisement(Intersections[0])
    console.log(mot1mot2)

    mot1mot4 = croisement(Intersections[1])
    console.log(mot1mot4)

    mot3mot2 = croisement(Intersections[2])
    console.log(mot3mot2)

    mot3mot4 = croisement(Intersections[3])
    console.log(mot3mot4)

    function croisementsenliste(liste) {
        listefinale = [];
        motactual = Intersections[0][0][0]
        for (el in liste) {
            if (liste[el][0][0] != motactual) {
                motactual = liste[el][0][0];
            }
            listebetter = [motactual, croisement(liste[el])]
            listefinale.push(listebetter);
        }
        return listefinale;
    }

    console.log("--------------------------------------------");
    console.log("Croisage des mots");
    lesmotscroises = croisementsenliste(listedespremiersresultats);
    console.log(lesmotscroises);

    console.log("--------------------------------------------");
    


    function commun(Listes) {
        console.log(Listes);
        ListeFinaleCommun = [];
        score = 0;

        motactual = Listes[0][0]
        Listetomerge = [];

        for (trouvemots in Listes) {
            if (Listes[trouvemots][0] != motactual) {
                console.log(Listetomerge);
                motactual = Listes[trouvemots][0];

                for (leslistes1 in Listetomerge) {
                    for (possibilites1 in Listetomerge[leslistes1][1]) {
                        Liste1tomerge = Listetomerge[leslistes1][1][parseInt(possibilites1)];
                        if (leslistes1 == Listetomerge.length - 1) {
                            break
                        }
                        
                        leslistes2 = parseInt(leslistes1 + 1);                       
                        for (possibilites2 in  Listetomerge[parseInt(leslistes2)][1]) {
                            
                            Liste2tomerge = Listetomerge[leslistes2][1][possibilites2];
                            ListeBien = []

                            console.log(Liste1tomerge);
                            console.log(Liste2tomerge);
                            if (Liste1tomerge != Liste2tomerge) {
                                ListeBien = Liste1tomerge.join(",").split(',').concat(Liste2tomerge.join(",").split(','));
                                
                                ListeBienFinaleMotus = [];
                                for (mo in ListeBien) {
                                    if (ListeBienFinaleMotus.includes(ListeBien[mo])) {
                                        
                                    } else {
                                        ListeBienFinaleMotus.push(ListeBien[mo]);
                                    }
                                }

                                Listefinaloo = ListeBienFinaleMotus.join(",").split(',');
                                
                                
                                if (Listefinaloo.length == Listetomerge.length + 1) {
                                    console.log(Listefinaloo);
                                    ListeFinaleCommun.push(Listefinaloo);
                                    
                                }
                                
    
                            }
                                
                        }     
                    }
                        
                }

                Listetomerge = [];
                Listetomerge.push(Listes[trouvemots]);
                
                
            } else {
                Listetomerge.push(Listes[trouvemots]);
                if (trouvemots == Listes.length - 1) {
                    
                    for (leslistes1 in Listetomerge) {
                        for (possibilites1 in Listetomerge[leslistes1][1]) {
                            Liste1tomerge = Listetomerge[leslistes1][1][parseInt(possibilites1)];
                            
                            if (leslistes1 == Listetomerge.length - 1) { 
                                break
                            }
                            
                            leslistes2 = parseInt(leslistes1 + 1);  
                                           
                            for (possibilites2 in Listetomerge[leslistes2][1]) {
                                
                                Liste2tomerge = Listetomerge[leslistes2][1][parseInt(possibilites2)];
 
                                ListeBien = []
                                if (Liste1tomerge != Liste2tomerge) {
                                    ListeBien = Liste1tomerge.join(",").split(',').concat(Liste2tomerge.join(",").split(','));
                                    
                                    ListeBienFinaleMotus = [];
                                    for (mo in ListeBien) {
                                        if (ListeBienFinaleMotus.includes(ListeBien[mo])) {
                                            
                                        } else {
                                            ListeBienFinaleMotus.push(ListeBien[mo]);
                                        }
                                    }

                                    Listefinaloo = ListeBienFinaleMotus.join(",").split(',');
                                    
                                    if (Listefinaloo.length == Listetomerge.length + 1) {
                                        console.log(Listefinaloo);
                                        ListeFinaleCommun.push(Listefinaloo);
                                    }
                                }
                            }
                                    
                        }     
                    }
                }
            }
        }

        alert(ListeFinaleCommun);
        return ListeFinaleCommun;
        
    }

    

    console.log("-------------------------------------");
    Intermediaire = commun(lesmotscroises);
    console.log(Intermediaire);
    console.log("-------------------------------------");


    function communFinal(Listes) {
        ListeFinale = [];
        score = 0;
        for (toutesleslistes in Listes) {

            ListeACheck = Listes[toutesleslistes]

            for (AutresListes in Listes) {

                ListeBien = Listes[AutresListes];
                if (ListeACheck != ListeBien) {

                    ListeBienFinaleMotus = ListeACheck;
                    for (mo in ListeBien) {
                        if (ListeBienFinaleMotus.includes(ListeBien[mo])) {
                            
                        } else {
                            ListeBienFinaleMotus.push(ListeBien[mo]);
                        }
                    }
        
                    Listefinaloo = ListeBienFinaleMotus.join(",").split(',');
                    
                    if (Listefinaloo.length == ListeBien.length + 1) {
                        ListeFinale.push(Listefinaloo);
                    }
                }
                
    
            }

        }
        return ListeFinale;
        
    }

    Fin = communFinal(Intermediaire);
    console.log(Fin);
    console.log("-------------------------------------");

    /*
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

                    
                    oldtuple1 = tuplee[1];
                    tuplee[1] = tuplee[0];
                    tuplee[0] = oldtuple1;
                    
                    console.log(tuplee);
                    
                    

                    
                        
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
    
    */
        
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
        
        tableau = document.getElementById("tableau").childNodes;
        for (let i = 0; i < listedemots[1].length; i++ ) {
            inputamodif = tableau[listedemots[0][1] + 1].childNodes[listedemots[0][0] + 1 + i];
            
            inputamodif.value = liste[mot][i];
        }
    }

    function setmotingrilleverti(listedemots, mot) {
        mot = mot - 1;
        
        tableau = document.getElementById("tableau").childNodes;
        for (let i = 0; i < listedemots[1].length; i++ ) {
            inputamodif = tableau[listedemots[0][1] + 1 + i].childNodes[listedemots[0][0] + 1];
            
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
        
