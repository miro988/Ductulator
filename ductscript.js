var _0xc1e4=["\x6C\x65\x6E\x67\x74\x68","\x74\x6F\x46\x69\x78\x65\x64","\x50\x49","\x70\x6F\x77","\x73\x70\x6C\x69\x63\x65","\x70\x75\x73\x68","\x76\x61\x6C\x75\x65","\x30\x30","\x67\x65\x74\x45\x6C\x65\x6D\x65\x6E\x74\x42\x79\x49\x64","\x43\x46\x4D","\x67\x65\x74\x45\x6C\x65\x6D\x65\x6E\x74\x73\x42\x79\x4E\x61\x6D\x65","\x69\x6E\x6E\x65\x72\x48\x54\x4D\x4C","\x30\x31","\x30\x32","\x30","\x31","\x32","\x33","\x6C\x65\x66\x74","\x73\x74\x79\x6C\x65","\x6D\x61\x72\x67\x69\x6E\x2D\x6C\x65\x66\x74\x3A\x20","\x65\x6D\x3B","\x73\x65\x74\x41\x74\x74\x72\x69\x62\x75\x74\x65","\x69\x6E\x63\x68\x53\x70\x61\x6E","\x67\x65\x74\x45\x6C\x65\x6D\x65\x6E\x74\x73\x42\x79\x43\x6C\x61\x73\x73\x4E\x61\x6D\x65"];function ReturnRndDuctArray(_0x5e68x2,_0x5e68x3,_0x5e68x4,_0x5e68x5){for(var _0x5e68x6=0;_0x5e68x6< _0x5e68x5[_0xc1e4[0]];_0x5e68x6++){var _0x5e68x7=CalcRndDuctStatic(_0x5e68x5[_0x5e68x6],CalcRndDuctVelocity(_0x5e68x5[_0x5e68x6],_0x5e68x2),3e-4,0.0751),_0x5e68x8=CalcRndDuctVelocity(_0x5e68x5[_0x5e68x6],_0x5e68x2);if(_0x5e68x7<= _0x5e68x4&& _0x5e68x8<= _0x5e68x3){break}};return [_0x5e68x5[_0x5e68x6],_0x5e68x8[_0xc1e4[1]](0),_0x5e68x7]}function CalcRndDuctVelocity(_0x5e68x2,_0x5e68x3){return 144* _0x5e68x3/ (Math[_0xc1e4[2]]* _0x5e68x2* _0x5e68x2/ 4)}function CalcRndDuctStatic(_0x5e68x2,_0x5e68x3,_0x5e68x4,_0x5e68x5){var _0x5e68x6=_0x5e68x3* _0x5e68x2/ 0.11631168,_0x5e68x7=0.11* Math[_0xc1e4[3]](12* _0x5e68x4/ _0x5e68x2+ 68/ _0x5e68x6,0.25);return (12* (_0x5e68x7>= 0.018?_0x5e68x7:0.85* _0x5e68x7+ 0.0028)* 100* _0x5e68x5* (_0x5e68x3/ 1097)* (_0x5e68x3/ 1097)/ _0x5e68x2)[_0xc1e4[1]](3)}function ReturnRecDuctArray(_0x5e68x2,_0x5e68x3,_0x5e68x4,_0x5e68x5,_0x5e68x6,_0x5e68x7,_0x5e68x8){var _0x5e68xc=!0;for(_0x5e68xe= 0;1== _0x5e68xc;_0x5e68xe++){_0x5e68x5[_0x5e68xe]>= _0x5e68x7&& (_0x5e68xc=  !1)};for(_0x5e68x5= _0x5e68x5[_0xc1e4[4]](_0x5e68xe- 1,_0x5e68x5[_0xc1e4[0]]),_0x5e68xc=  !0,_0x5e68xe= 0;1== _0x5e68xc;_0x5e68xe++){_0x5e68x6[_0x5e68xe]>= _0x5e68x7&& (_0x5e68xc=  !1)};for(var _0x5e68xd=[],_0x5e68xe=0;_0x5e68xe< _0x5e68x5[_0xc1e4[0]];_0x5e68xe++){for(var _0x5e68xf=0;_0x5e68xf< _0x5e68x6[_0xc1e4[0]];_0x5e68xf++){var _0x5e68x10=144* _0x5e68x2/ (_0x5e68x5[_0x5e68xe]* _0x5e68x6[_0x5e68xf]),_0x5e68x11=CalcRndDuctStatic(2* _0x5e68x5[_0x5e68xe]* _0x5e68x6[_0x5e68xf]/ (_0x5e68x5[_0x5e68xe]+ _0x5e68x6[_0x5e68xf]),_0x5e68x10,3e-4,0.0751);if(_0x5e68x10<= _0x5e68x3&& _0x5e68x11<= _0x5e68x4&& _0x5e68x5[_0x5e68xe]/ _0x5e68x6[_0x5e68xf]< _0x5e68x8){_0x5e68xd[_0xc1e4[5]]([_0x5e68x5[_0x5e68xe],_0x5e68x6[_0x5e68xf],_0x5e68x10[_0xc1e4[1]](0),_0x5e68x11]),_0x5e68x6[_0xc1e4[4]](_0x5e68xf,_0x5e68x6[_0xc1e4[0]]),_0x5e68x5[_0xc1e4[4]](0,_0x5e68xe- 1);break}}};return _0x5e68xd}function CalcMeRnd(){var _0x5e68x2=document[_0xc1e4[8]](_0xc1e4[7])[_0xc1e4[6]],_0x5e68x3=576* document[_0xc1e4[10]](_0xc1e4[9])[0][_0xc1e4[6]]/ (Math[_0xc1e4[2]]* _0x5e68x2* _0x5e68x2);document[_0xc1e4[8]](_0xc1e4[12])[_0xc1e4[11]]= _0x5e68x3[_0xc1e4[1]](0);var _0x5e68x4=CalcRndDuctStatic(_0x5e68x2,_0x5e68x3,3e-4,0.0751);document[_0xc1e4[8]](_0xc1e4[13])[_0xc1e4[11]]= _0x5e68x4}function CalcMeRec(_0x5e68x2){var _0x5e68x3=document[_0xc1e4[10]](_0xc1e4[9])[0][_0xc1e4[6]],_0x5e68x4=document[_0xc1e4[8]](_0x5e68x2+ _0xc1e4[14])[_0xc1e4[6]],_0x5e68x5=document[_0xc1e4[8]](_0x5e68x2+ _0xc1e4[15])[_0xc1e4[6]],_0x5e68x6=144* _0x5e68x3/ (Number(_0x5e68x4)* Number(_0x5e68x5)),_0x5e68x7=2* _0x5e68x4* _0x5e68x5/ (Number(_0x5e68x4)+ Number(_0x5e68x5));document[_0xc1e4[8]](_0x5e68x2+ _0xc1e4[16])[_0xc1e4[11]]= _0x5e68x6[_0xc1e4[1]](0);var _0x5e68x8=CalcRndDuctStatic(_0x5e68x7,_0x5e68x6,3e-4,0.0751);document[_0xc1e4[8]](_0x5e68x2+ _0xc1e4[17])[_0xc1e4[11]]= _0x5e68x8,document[_0xc1e4[8]](_0x5e68x2+ _0xc1e4[15])[_0xc1e4[18]]}function FitAapostrophe(_0x5e68x2){var _0x5e68x3=document[_0xc1e4[8]](_0x5e68x2)[_0xc1e4[6]][_0xc1e4[0]]/ 2- 3;document[_0xc1e4[24]](_0xc1e4[23])[(_0x5e68x2- 11)/ 10][_0xc1e4[22]](_0xc1e4[19],_0xc1e4[20]+ _0x5e68x3+ _0xc1e4[21])}