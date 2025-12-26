//Public Variables:
var PrevInputBoxID = 10;

function ReturnRndDuctArray(CFM, MaxVel, MaxStatic, RndDuctArray) {
  //While(Array(i) & MaxVel)
  //RndDuct(200, 600, 0.01, [4, 6, 8, 10, 12, 14])
  //var RndDuctArray = [4, 6, 8, 10, 12, 14];
  //var i;
  //for (i = 0; i < RndDuctArray.length; i++) {
  //    console.log(RndDuctArray[i], CalcRndDuctStatic(RndDuctArray[i], CFM, 0.0003, 0.0751));
  //}
  //for (n = RndDuctArray.length - 1; CalcRndDuctStatic(RndDuctArray[n], CFM, 0.0003, 0.0751) < MaxStatic && CalcRndDuctVelocity(RndDuctArray[n], CFM) < MaxVel; n--) {
  //    var v = CalcRndDuctVelocity(RndDuctArray[n], CFM);
  //    console.log(RndDuctArray[n], v, CalcRndDuctStatic(RndDuctArray[n], CFM, 0.0003, 0.0751));
  //}
  //var n = 0; //RndDuctArray.length - 1;
  //var flag = true;
  //var st = [];
  //var v = [];
  //RndDuctArray.reverse();
  for (var i = 0; i < RndDuctArray.length; i++) {
    var st = CalcRndDuctStatic(
      RndDuctArray[i],
      CalcRndDuctVelocity(RndDuctArray[i], CFM),
      0.018,
      0.0751,
      0.0003
    );
    var v = CalcRndDuctVelocity(RndDuctArray[i], CFM);
    //console.log(RndDuctArray[n], v[n].toFixed(0), st[n]);

    if ((st <= MaxStatic && v <= MaxVel) || i > 1e10) {
      break;
    }
  }
  return [RndDuctArray[i], v.toFixed(0), st];
}

function CalcRndDuctVelocity(Diameter, CFM) {
  return (CFM * 144) / ((Math.PI * Diameter * Diameter) / 4);
}

function CalcRndDuctStatic(Dh, V, e, Density, DuctRo) {
  //V = Velocity [FPM]
  //e = Air Dynamic Viscocity [cP]
  //Density = Air Density=0.0751 [lb/ft3]
  //DuctRo = Duct  roughness=.0003 [ft]

  e = (e * 30.48) / (100 * 453.592 * Density); //Kinematic Viscosity [ft2/s]

  var Re = (V * Dh) / (e * 720); //e duct roghness

  var fprime = 0.11 * Math.pow((DuctRo * 12) / Dh + 68 / Re, 0.25);
  var f = 0.0;
  if (fprime >= 0.018) {
    f = fprime;
  } else {
    f = 0.85 * fprime + 0.0028;
  }

  var DeltaP = (12 * f * 0.0751 * 100 * Math.pow(V / 1097.238146, 2)) / Dh;

  return DeltaP.toFixed(3);
}

//Delete unnessessary data from WidthArray and HeightArray
//var found = array1.find(function(element) {
//    return element > 10;
//});
//given values for function start
function ReturnRecDuctArray(
  CFM,
  MaxVel,
  MaxStatic,
  WidthArray,
  HeightArray,
  ExRndDuct,
  Ratio
) {
  //WidthArray = [2, 4, 6, 8, 10, 12, 14, 16, 18, 20];
  //HeightArray = [2, 4, 6, 8, 10, 12, 14];
  //ReturnRecDuctArray(400,800,.08,[2, 4, 6, 8, 10, 12, 14, 16, 18, 20],[2, 4, 6, 8, 10, 12, 14],6);
  var flag = true;

  //WidthArray.splice(2,3);
  for (i = 0; flag == true; i++) {
    if (WidthArray[i] >= ExRndDuct) {
      //var max=WidthArray[i];
      flag = false;
    }
  }
  //console.log(WidthArray.splice(i-1,WidthArray.length));
  var WidthArray = WidthArray.splice(i - 1, WidthArray.length);
  //console.log(WidthArray);

  var flag = true;
  //WidthArray.splice(2,3);
  for (i = 0; flag == true; i++) {
    if (HeightArray[i] >= ExRndDuct) {
      //var max=WidthArray[i];
      flag = false;
    }
  }
  //var HeightArray = HeightArray.splice(0, i);

  //console.log(HeightArray);
  //---------------------------------------------------
  //fill Array
  var RectDucts = [];
  for (var i = 0; i < WidthArray.length; i++) {
    for (var j = 0; j < HeightArray.length; j++) {
      var v = (CFM * 144) / (WidthArray[i] * HeightArray[j]);
      var Dh =
        (2 * WidthArray[i] * HeightArray[j]) / (WidthArray[i] + HeightArray[j]);
      var st = CalcRndDuctStatic(Dh, v, 0.0003, 0.0751, 0.0003); //?
      //console.log(WidthArray[i], HeightArray[j], v, st,i,j);
      if (
        v <= MaxVel &&
        st <= MaxStatic &&
        WidthArray[i] / HeightArray[j] < Ratio
      ) {
        RectDucts.push([WidthArray[i], HeightArray[j], v.toFixed(0), st]);
        //i++; //WidthArray.length;
        //console.log(WidthArray[i], HeightArray[j], v, st,i,j);
        HeightArray.splice(j, HeightArray.length);
        WidthArray.splice(0, i - 1);
        //console.log(WidthArray, HeightArray);
        break;
      }
    }
  }
  //console.log(RectDucts);
  return RectDucts;
}

function CalcMeRnd() {
  var D = document.getElementById("00").value;
  var Q = document.getElementsByName("CFM")[0].value;
  var V = (576 * Q) / (Math.PI * D * D);
  document.getElementById("01").innerHTML = V.toFixed(0);
  var ST = CalcRndDuctStatic(D, V, 0.0003, 0.0751, 0.0003);
  document.getElementById("02").innerHTML = ST;
  //NEW CODE HERE
  //document.getElementById("00").style.background= "#FF5733";
  //previousElement=document.activeElement
  document.getElementById(PrevInputBoxID).style.textDecoration = "initial";
  document.activeElement.style.textDecoration = "underline";
  PrevInputBoxID = document.activeElement.id;
}

function CalcMeRec(row) {
  var Q = document.getElementsByName("CFM")[0].value;
  var W = document.getElementById(row + "0").value;
  var H = document.getElementById(row + "1").value;
  // document.getElementById(row + "1").inchSpan
  var V = (144 * Q) / (Number(W) * Number(H));
  var Dh = (2 * W * H) / (Number(W) + Number(H));
  document.getElementById(row + "2").innerHTML = V.toFixed(0);
  var ST = CalcRndDuctStatic(Dh, V, 0.0003, 0.0751, 0.0003);
  document.getElementById(row + "3").innerHTML = ST;
  //sdd change length here
  document.getElementById(row + "1").left;

  //document.getElementById(row + "0").style.background= "Red";
  //document.getElementById(row + "1").style.background= "Red";
  //document.querySelectorAll('input').style.textDecoration= "none"
  document.getElementById(PrevInputBoxID).style.textDecoration = "initial";
  document.activeElement.style.textDecoration = "underline";
  PrevInputBoxID = document.activeElement.id;

  /* if (previousElement.id !== document.activeElement.id ||previousElement==null){
    
    document.activeElement.style.background= "#FF5733";

    previousElement.style.background="White";
    previousElement=document.activeElement;

    } */
}

function FitAapostrophe(id) {
  var n = document.getElementById(id).value.length / 2 - 3;
  document
    .getElementsByClassName("inchSpan")
    [(id - 11) / 10].setAttribute("style", "margin-left: " + n + "em;");
}

/* function toggleSteps(element) {
    var minutes = parseInt(element.value);
    if (minutes > 10) {
        element.step = 10;
    } else {
        element.step = 1;
    }
} */
