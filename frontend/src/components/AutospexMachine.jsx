import React from 'react';
import { useGLTF } from '@react-three/drei';

const INDUSTRIAL_PALETTE = {
  blue: ["Final042"],
  black: ["Final005"],
  panel: ["Final010"],
  safety: ["Final080"],
  frame: [] // Silver defaults to everything else
};

export default function AutospexMachine(props) {
  const { nodes } = useGLTF('/autospex-machine.glb');

  const getMaterialColor = (name) => {
    if (INDUSTRIAL_PALETTE.blue.includes(name)) return "#0284C7";
    if (INDUSTRIAL_PALETTE.black.includes(name)) return "#1E293B";
    if (INDUSTRIAL_PALETTE.panel.includes(name)) return "#1E3A8A";
    if (INDUSTRIAL_PALETTE.safety.includes(name)) return "#DC2626";
    return "#CBD5E1"; 
  };

return (
    <group 
      {...props} 
      dispose={null} 
      rotation={[Math.PI / 2,0, 0]}
      // <group {...props} dispose={null} rotation={[0, 0, 0]}>
      
      // 👇 THE DEVELOPER CLICK TOOL
      // Click any part on your website, and it will tell you its secret name!
      onClick={(e) => {
        e.stopPropagation();
        // alert(`You clicked: ${e.object.name}\nAdd this to the PALETTE at the top of the code!`);
      }}
    >
      <mesh name="Final" geometry={nodes.Final.geometry} material={nodes.Final.material} material-color={getMaterialColor("Final")} />
      <mesh name="Final001" geometry={nodes.Final001.geometry} material={nodes.Final001.material} material-color={getMaterialColor("Final001")} />
      <mesh name="Final002" geometry={nodes.Final002.geometry} material={nodes.Final002.material} material-color={getMaterialColor("Final002")} />
      <mesh name="Final003" geometry={nodes.Final003.geometry} material={nodes.Final003.material} material-color={getMaterialColor("Final003")} />
      <mesh name="Final004" geometry={nodes.Final004.geometry} material={nodes.Final004.material} material-color={getMaterialColor("Final004")} />
      <mesh name="Final005" geometry={nodes.Final005.geometry} material={nodes.Final005.material} material-color={getMaterialColor("Final005")} />
      <mesh name="Final006" geometry={nodes.Final006.geometry} material={nodes.Final006.material} material-color={getMaterialColor("Final006")} />
      <mesh name="Final007" geometry={nodes.Final007.geometry} material={nodes.Final007.material} material-color={getMaterialColor("Final007")} />
      <mesh name="Final008" geometry={nodes.Final008.geometry} material={nodes.Final008.material} material-color={getMaterialColor("Final008")} />
      <mesh name="Final009" geometry={nodes.Final009.geometry} material={nodes.Final009.material} material-color={getMaterialColor("Final009")} />
      <mesh name="Final010" geometry={nodes.Final010.geometry} material={nodes.Final010.material} material-color={getMaterialColor("Final010")} />
      <mesh name="Final011" geometry={nodes.Final011.geometry} material={nodes.Final011.material} material-color={getMaterialColor("Final011")} />
      <mesh name="Final012" geometry={nodes.Final012.geometry} material={nodes.Final012.material} material-color={getMaterialColor("Final012")} />
      <mesh name="Final013" geometry={nodes.Final013.geometry} material={nodes.Final013.material} material-color={getMaterialColor("Final013")} />
      <mesh name="Final014" geometry={nodes.Final014.geometry} material={nodes.Final014.material} material-color={getMaterialColor("Final014")} />
      <mesh name="Final015" geometry={nodes.Final015.geometry} material={nodes.Final015.material} material-color={getMaterialColor("Final015")} />
      <mesh name="Final016" geometry={nodes.Final016.geometry} material={nodes.Final016.material} material-color={getMaterialColor("Final016")} />
      <mesh name="Final017" geometry={nodes.Final017.geometry} material={nodes.Final017.material} material-color={getMaterialColor("Final017")} />
      <mesh name="Final018" geometry={nodes.Final018.geometry} material={nodes.Final018.material} material-color={getMaterialColor("Final018")} />
      <mesh name="Final019" geometry={nodes.Final019.geometry} material={nodes.Final019.material} material-color={getMaterialColor("Final019")} />
      <mesh name="Final020" geometry={nodes.Final020.geometry} material={nodes.Final020.material} material-color={getMaterialColor("Final020")} />
      <mesh name="Final021" geometry={nodes.Final021.geometry} material={nodes.Final021.material} material-color={getMaterialColor("Final021")} />
      <mesh name="Final022" geometry={nodes.Final022.geometry} material={nodes.Final022.material} material-color={getMaterialColor("Final022")} />
      <mesh name="Final023" geometry={nodes.Final023.geometry} material={nodes.Final023.material} material-color={getMaterialColor("Final023")} />
      <mesh name="Final024" geometry={nodes.Final024.geometry} material={nodes.Final024.material} material-color={getMaterialColor("Final024")} />
      <mesh name="Final025" geometry={nodes.Final025.geometry} material={nodes.Final025.material} material-color={getMaterialColor("Final025")} />
      <mesh name="Final026" geometry={nodes.Final026.geometry} material={nodes.Final026.material} material-color={getMaterialColor("Final026")} />
      <mesh name="Final027" geometry={nodes.Final027.geometry} material={nodes.Final027.material} material-color={getMaterialColor("Final027")} />
      <mesh name="Final028" geometry={nodes.Final028.geometry} material={nodes.Final028.material} material-color={getMaterialColor("Final028")} />
      <mesh name="Final029" geometry={nodes.Final029.geometry} material={nodes.Final029.material} material-color={getMaterialColor("Final029")} />
      <mesh name="Final030" geometry={nodes.Final030.geometry} material={nodes.Final030.material} material-color={getMaterialColor("Final030")} />
      <mesh name="Final031" geometry={nodes.Final031.geometry} material={nodes.Final031.material} material-color={getMaterialColor("Final031")} />
      <mesh name="Final032" geometry={nodes.Final032.geometry} material={nodes.Final032.material} material-color={getMaterialColor("Final032")} />
      <mesh name="Final033" geometry={nodes.Final033.geometry} material={nodes.Final033.material} material-color={getMaterialColor("Final033")} />
      <mesh name="Final034" geometry={nodes.Final034.geometry} material={nodes.Final034.material} material-color={getMaterialColor("Final034")} />
      <mesh name="Final035" geometry={nodes.Final035.geometry} material={nodes.Final035.material} material-color={getMaterialColor("Final035")} />
      <mesh name="Final036" geometry={nodes.Final036.geometry} material={nodes.Final036.material} material-color={getMaterialColor("Final036")} />
      <mesh name="Final037" geometry={nodes.Final037.geometry} material={nodes.Final037.material} material-color={getMaterialColor("Final037")} />
      <mesh name="Final038" geometry={nodes.Final038.geometry} material={nodes.Final038.material} material-color={getMaterialColor("Final038")} />
      <mesh name="Final039" geometry={nodes.Final039.geometry} material={nodes.Final039.material} material-color={getMaterialColor("Final039")} />
      <mesh name="Final040" geometry={nodes.Final040.geometry} material={nodes.Final040.material} material-color={getMaterialColor("Final040")} />
      <mesh name="Final041" geometry={nodes.Final041.geometry} material={nodes.Final041.material} material-color={getMaterialColor("Final041")} />
      <mesh name="Final042" geometry={nodes.Final042.geometry} material={nodes.Final042.material} material-color={getMaterialColor("Final042")} />
      <mesh name="Final043" geometry={nodes.Final043.geometry} material={nodes.Final043.material} material-color={getMaterialColor("Final043")} />
      <mesh name="Final044" geometry={nodes.Final044.geometry} material={nodes.Final044.material} material-color={getMaterialColor("Final044")} />
      <mesh name="Final045" geometry={nodes.Final045.geometry} material={nodes.Final045.material} material-color={getMaterialColor("Final045")} />
      <mesh name="Final046" geometry={nodes.Final046.geometry} material={nodes.Final046.material} material-color={getMaterialColor("Final046")} />
      <mesh name="Final047" geometry={nodes.Final047.geometry} material={nodes.Final047.material} material-color={getMaterialColor("Final047")} />
      <mesh name="Final048" geometry={nodes.Final048.geometry} material={nodes.Final048.material} material-color={getMaterialColor("Final048")} />
      <mesh name="Final049" geometry={nodes.Final049.geometry} material={nodes.Final049.material} material-color={getMaterialColor("Final049")} />
      <mesh name="Final050" geometry={nodes.Final050.geometry} material={nodes.Final050.material} material-color={getMaterialColor("Final050")} />
      <mesh name="Final051" geometry={nodes.Final051.geometry} material={nodes.Final051.material} material-color={getMaterialColor("Final051")} />
      <mesh name="Final052" geometry={nodes.Final052.geometry} material={nodes.Final052.material} material-color={getMaterialColor("Final052")} />
      <mesh name="Final053" geometry={nodes.Final053.geometry} material={nodes.Final053.material} material-color={getMaterialColor("Final053")} />
      <mesh name="Final054" geometry={nodes.Final054.geometry} material={nodes.Final054.material} material-color={getMaterialColor("Final054")} />
      <mesh name="Final055" geometry={nodes.Final055.geometry} material={nodes.Final055.material} material-color={getMaterialColor("Final055")} />
      <mesh name="Final056" geometry={nodes.Final056.geometry} material={nodes.Final056.material} material-color={getMaterialColor("Final056")} />
      <mesh name="Final057" geometry={nodes.Final057.geometry} material={nodes.Final057.material} material-color={getMaterialColor("Final057")} />
      <mesh name="Final058" geometry={nodes.Final058.geometry} material={nodes.Final058.material} material-color={getMaterialColor("Final058")} />
      <mesh name="Final059" geometry={nodes.Final059.geometry} material={nodes.Final059.material} material-color={getMaterialColor("Final059")} />
      <mesh name="Final060" geometry={nodes.Final060.geometry} material={nodes.Final060.material} material-color={getMaterialColor("Final060")} />
      <mesh name="Final061" geometry={nodes.Final061.geometry} material={nodes.Final061.material} material-color={getMaterialColor("Final061")} />
      <mesh name="Final062" geometry={nodes.Final062.geometry} material={nodes.Final062.material} material-color={getMaterialColor("Final062")} />
      <mesh name="Final063" geometry={nodes.Final063.geometry} material={nodes.Final063.material} material-color={getMaterialColor("Final063")} />
      <mesh name="Final064" geometry={nodes.Final064.geometry} material={nodes.Final064.material} material-color={getMaterialColor("Final064")} />
      <mesh name="Final065" geometry={nodes.Final065.geometry} material={nodes.Final065.material} material-color={getMaterialColor("Final065")} />
      <mesh name="Final066" geometry={nodes.Final066.geometry} material={nodes.Final066.material} material-color={getMaterialColor("Final066")} />
      <mesh name="Final067" geometry={nodes.Final067.geometry} material={nodes.Final067.material} material-color={getMaterialColor("Final067")} />
      <mesh name="Final068" geometry={nodes.Final068.geometry} material={nodes.Final068.material} material-color={getMaterialColor("Final068")} />
      <mesh name="Final069" geometry={nodes.Final069.geometry} material={nodes.Final069.material} material-color={getMaterialColor("Final069")} />
      <mesh name="Final070" geometry={nodes.Final070.geometry} material={nodes.Final070.material} material-color={getMaterialColor("Final070")} />
      <mesh name="Final071" geometry={nodes.Final071.geometry} material={nodes.Final071.material} material-color={getMaterialColor("Final071")} />
      <mesh name="Final072" geometry={nodes.Final072.geometry} material={nodes.Final072.material} material-color={getMaterialColor("Final072")} />
      <mesh name="Final073" geometry={nodes.Final073.geometry} material={nodes.Final073.material} material-color={getMaterialColor("Final073")} />
      <mesh name="Final074" geometry={nodes.Final074.geometry} material={nodes.Final074.material} material-color={getMaterialColor("Final074")} />
      <mesh name="Final075" geometry={nodes.Final075.geometry} material={nodes.Final075.material} material-color={getMaterialColor("Final075")} />
      <mesh name="Final076" geometry={nodes.Final076.geometry} material={nodes.Final076.material} material-color={getMaterialColor("Final076")} />
      <mesh name="Final077" geometry={nodes.Final077.geometry} material={nodes.Final077.material} material-color={getMaterialColor("Final077")} />
      <mesh name="Final078" geometry={nodes.Final078.geometry} material={nodes.Final078.material} material-color={getMaterialColor("Final078")} />
      <mesh name="Final079" geometry={nodes.Final079.geometry} material={nodes.Final079.material} material-color={getMaterialColor("Final079")} />
      <mesh name="Final080" geometry={nodes.Final080.geometry} material={nodes.Final080.material} material-color={getMaterialColor("Final080")} />
      <mesh name="Final081" geometry={nodes.Final081.geometry} material={nodes.Final081.material} material-color={getMaterialColor("Final081")} />
      <mesh name="Final082" geometry={nodes.Final082.geometry} material={nodes.Final082.material} material-color={getMaterialColor("Final082")} />
      <mesh name="Final083" geometry={nodes.Final083.geometry} material={nodes.Final083.material} material-color={getMaterialColor("Final083")} />
      <mesh name="Final084" geometry={nodes.Final084.geometry} material={nodes.Final084.material} material-color={getMaterialColor("Final084")} />
      <mesh name="Final085" geometry={nodes.Final085.geometry} material={nodes.Final085.material} material-color={getMaterialColor("Final085")} />
      <mesh name="Final086" geometry={nodes.Final086.geometry} material={nodes.Final086.material} material-color={getMaterialColor("Final086")} />
      <mesh name="Final087" geometry={nodes.Final087.geometry} material={nodes.Final087.material} material-color={getMaterialColor("Final087")} />
      <mesh name="Final088" geometry={nodes.Final088.geometry} material={nodes.Final088.material} material-color={getMaterialColor("Final088")} />
      <mesh name="Final089" geometry={nodes.Final089.geometry} material={nodes.Final089.material} material-color={getMaterialColor("Final089")} />
      <mesh name="Final090" geometry={nodes.Final090.geometry} material={nodes.Final090.material} material-color={getMaterialColor("Final090")} />
      <mesh name="Final091" geometry={nodes.Final091.geometry} material={nodes.Final091.material} material-color={getMaterialColor("Final091")} />
      <mesh name="Final092" geometry={nodes.Final092.geometry} material={nodes.Final092.material} material-color={getMaterialColor("Final092")} />
      <mesh name="Final093" geometry={nodes.Final093.geometry} material={nodes.Final093.material} material-color={getMaterialColor("Final093")} />
      <mesh name="Final094" geometry={nodes.Final094.geometry} material={nodes.Final094.material} material-color={getMaterialColor("Final094")} />
      <mesh name="Final095" geometry={nodes.Final095.geometry} material={nodes.Final095.material} material-color={getMaterialColor("Final095")} />
      <mesh name="Final096" geometry={nodes.Final096.geometry} material={nodes.Final096.material} material-color={getMaterialColor("Final096")} />
      <mesh name="Final097" geometry={nodes.Final097.geometry} material={nodes.Final097.material} material-color={getMaterialColor("Final097")} />
      <mesh name="Final098" geometry={nodes.Final098.geometry} material={nodes.Final098.material} material-color={getMaterialColor("Final098")} />
      <mesh name="Final099" geometry={nodes.Final099.geometry} material={nodes.Final099.material} material-color={getMaterialColor("Final099")} />
      <mesh name="Final100" geometry={nodes.Final100.geometry} material={nodes.Final100.material} material-color={getMaterialColor("Final100")} />
      <mesh name="Final101" geometry={nodes.Final101.geometry} material={nodes.Final101.material} material-color={getMaterialColor("Final101")} />
      <mesh name="Final102" geometry={nodes.Final102.geometry} material={nodes.Final102.material} material-color={getMaterialColor("Final102")} />
      <mesh name="Final103" geometry={nodes.Final103.geometry} material={nodes.Final103.material} material-color={getMaterialColor("Final103")} />
      <mesh name="Final104" geometry={nodes.Final104.geometry} material={nodes.Final104.material} material-color={getMaterialColor("Final104")} />
      <mesh name="Final105" geometry={nodes.Final105.geometry} material={nodes.Final105.material} material-color={getMaterialColor("Final105")} />
      <mesh name="Final106" geometry={nodes.Final106.geometry} material={nodes.Final106.material} material-color={getMaterialColor("Final106")} />
      <mesh name="Final107" geometry={nodes.Final107.geometry} material={nodes.Final107.material} material-color={getMaterialColor("Final107")} />
      <mesh name="Final108" geometry={nodes.Final108.geometry} material={nodes.Final108.material} material-color={getMaterialColor("Final108")} />
      <mesh name="Final109" geometry={nodes.Final109.geometry} material={nodes.Final109.material} material-color={getMaterialColor("Final109")} />
      <mesh name="Final110" geometry={nodes.Final110.geometry} material={nodes.Final110.material} material-color={getMaterialColor("Final110")} />
      <mesh name="Final111" geometry={nodes.Final111.geometry} material={nodes.Final111.material} material-color={getMaterialColor("Final111")} />
      <mesh name="Final112" geometry={nodes.Final112.geometry} material={nodes.Final112.material} material-color={getMaterialColor("Final112")} />
      <mesh name="Final113" geometry={nodes.Final113.geometry} material={nodes.Final113.material} material-color={getMaterialColor("Final113")} />
      <mesh name="Final114" geometry={nodes.Final114.geometry} material={nodes.Final114.material} material-color={getMaterialColor("Final114")} />
      <mesh name="Final115" geometry={nodes.Final115.geometry} material={nodes.Final115.material} material-color={getMaterialColor("Final115")} />
      <mesh name="Final116" geometry={nodes.Final116.geometry} material={nodes.Final116.material} material-color={getMaterialColor("Final116")} />
      <mesh name="Final117" geometry={nodes.Final117.geometry} material={nodes.Final117.material} material-color={getMaterialColor("Final117")} />
      <mesh name="Final118" geometry={nodes.Final118.geometry} material={nodes.Final118.material} material-color={getMaterialColor("Final118")} />
      <mesh name="Final119" geometry={nodes.Final119.geometry} material={nodes.Final119.material} material-color={getMaterialColor("Final119")} />
      <mesh name="Final120" geometry={nodes.Final120.geometry} material={nodes.Final120.material} material-color={getMaterialColor("Final120")} />
      <mesh name="Final121" geometry={nodes.Final121.geometry} material={nodes.Final121.material} material-color={getMaterialColor("Final121")} />
      <mesh name="Final122" geometry={nodes.Final122.geometry} material={nodes.Final122.material} material-color={getMaterialColor("Final122")} />
      <mesh name="Final123" geometry={nodes.Final123.geometry} material={nodes.Final123.material} material-color={getMaterialColor("Final123")} />
      <mesh name="Final124" geometry={nodes.Final124.geometry} material={nodes.Final124.material} material-color={getMaterialColor("Final124")} />
      <mesh name="Final125" geometry={nodes.Final125.geometry} material={nodes.Final125.material} material-color={getMaterialColor("Final125")} />
      <mesh name="Final126" geometry={nodes.Final126.geometry} material={nodes.Final126.material} material-color={getMaterialColor("Final126")} />
      <mesh name="Final127" geometry={nodes.Final127.geometry} material={nodes.Final127.material} material-color={getMaterialColor("Final127")} />
      <mesh name="Final128" geometry={nodes.Final128.geometry} material={nodes.Final128.material} material-color={getMaterialColor("Final128")} />
      <mesh name="Final129" geometry={nodes.Final129.geometry} material={nodes.Final129.material} material-color={getMaterialColor("Final129")} />
      <mesh name="Final130" geometry={nodes.Final130.geometry} material={nodes.Final130.material} material-color={getMaterialColor("Final130")} />
      <mesh name="Final131" geometry={nodes.Final131.geometry} material={nodes.Final131.material} material-color={getMaterialColor("Final131")} />
      <mesh name="Final132" geometry={nodes.Final132.geometry} material={nodes.Final132.material} material-color={getMaterialColor("Final132")} />
      <mesh name="Final133" geometry={nodes.Final133.geometry} material={nodes.Final133.material} material-color={getMaterialColor("Final133")} />
      <mesh name="Final134" geometry={nodes.Final134.geometry} material={nodes.Final134.material} material-color={getMaterialColor("Final134")} />
      <mesh name="Final135" geometry={nodes.Final135.geometry} material={nodes.Final135.material} material-color={getMaterialColor("Final135")} />
      <mesh name="Final136" geometry={nodes.Final136.geometry} material={nodes.Final136.material} material-color={getMaterialColor("Final136")} />
      <mesh name="Final137" geometry={nodes.Final137.geometry} material={nodes.Final137.material} material-color={getMaterialColor("Final137")} />
      <mesh name="Final138" geometry={nodes.Final138.geometry} material={nodes.Final138.material} material-color={getMaterialColor("Final138")} />
      <mesh name="Final139" geometry={nodes.Final139.geometry} material={nodes.Final139.material} material-color={getMaterialColor("Final139")} />
      <mesh name="Final140" geometry={nodes.Final140.geometry} material={nodes.Final140.material} material-color={getMaterialColor("Final140")} />
      <mesh name="Final141" geometry={nodes.Final141.geometry} material={nodes.Final141.material} material-color={getMaterialColor("Final141")} />
      <mesh name="Final142" geometry={nodes.Final142.geometry} material={nodes.Final142.material} material-color={getMaterialColor("Final142")} />
      <mesh name="Final143" geometry={nodes.Final143.geometry} material={nodes.Final143.material} material-color={getMaterialColor("Final143")} />
      <mesh name="Final144" geometry={nodes.Final144.geometry} material={nodes.Final144.material} material-color={getMaterialColor("Final144")} />
      <mesh name="Final145" geometry={nodes.Final145.geometry} material={nodes.Final145.material} material-color={getMaterialColor("Final145")} />
      <mesh name="Final146" geometry={nodes.Final146.geometry} material={nodes.Final146.material} material-color={getMaterialColor("Final146")} />
      <mesh name="Final147" geometry={nodes.Final147.geometry} material={nodes.Final147.material} material-color={getMaterialColor("Final147")} />
      <mesh name="Final148" geometry={nodes.Final148.geometry} material={nodes.Final148.material} material-color={getMaterialColor("Final148")} />
      <mesh name="Final149" geometry={nodes.Final149.geometry} material={nodes.Final149.material} material-color={getMaterialColor("Final149")} />
      <mesh name="Final150" geometry={nodes.Final150.geometry} material={nodes.Final150.material} material-color={getMaterialColor("Final150")} />
      <mesh name="Final151" geometry={nodes.Final151.geometry} material={nodes.Final151.material} material-color={getMaterialColor("Final151")} />
      <mesh name="Final152" geometry={nodes.Final152.geometry} material={nodes.Final152.material} material-color={getMaterialColor("Final152")} />
      <mesh name="Final153" geometry={nodes.Final153.geometry} material={nodes.Final153.material} material-color={getMaterialColor("Final153")} />
      <mesh name="Final154" geometry={nodes.Final154.geometry} material={nodes.Final154.material} material-color={getMaterialColor("Final154")} />
      <mesh name="Final155" geometry={nodes.Final155.geometry} material={nodes.Final155.material} material-color={getMaterialColor("Final155")} />
      <mesh name="Final156" geometry={nodes.Final156.geometry} material={nodes.Final156.material} material-color={getMaterialColor("Final156")} />
      <mesh name="Final157" geometry={nodes.Final157.geometry} material={nodes.Final157.material} material-color={getMaterialColor("Final157")} />
      <mesh name="Final158" geometry={nodes.Final158.geometry} material={nodes.Final158.material} material-color={getMaterialColor("Final158")} />
      <mesh name="Final159" geometry={nodes.Final159.geometry} material={nodes.Final159.material} material-color={getMaterialColor("Final159")} />
      <mesh name="Final160" geometry={nodes.Final160.geometry} material={nodes.Final160.material} material-color={getMaterialColor("Final160")} />
      <mesh name="Final161" geometry={nodes.Final161.geometry} material={nodes.Final161.material} material-color={getMaterialColor("Final161")} />
      <mesh name="Final162" geometry={nodes.Final162.geometry} material={nodes.Final162.material} material-color={getMaterialColor("Final162")} />
      <mesh name="Final163" geometry={nodes.Final163.geometry} material={nodes.Final163.material} material-color={getMaterialColor("Final163")} />
      <mesh name="Final164" geometry={nodes.Final164.geometry} material={nodes.Final164.material} material-color={getMaterialColor("Final164")} />
      <mesh name="Final165" geometry={nodes.Final165.geometry} material={nodes.Final165.material} material-color={getMaterialColor("Final165")} />
      <mesh name="Final166" geometry={nodes.Final166.geometry} material={nodes.Final166.material} material-color={getMaterialColor("Final166")} />
      <mesh name="Final167" geometry={nodes.Final167.geometry} material={nodes.Final167.material} material-color={getMaterialColor("Final167")} />
      <mesh name="Final168" geometry={nodes.Final168.geometry} material={nodes.Final168.material} material-color={getMaterialColor("Final168")} />
      <mesh name="Final169" geometry={nodes.Final169.geometry} material={nodes.Final169.material} material-color={getMaterialColor("Final169")} />
      <mesh name="Final170" geometry={nodes.Final170.geometry} material={nodes.Final170.material} material-color={getMaterialColor("Final170")} />
      <mesh name="Final171" geometry={nodes.Final171.geometry} material={nodes.Final171.material} material-color={getMaterialColor("Final171")} />
      <mesh name="Final172" geometry={nodes.Final172.geometry} material={nodes.Final172.material} material-color={getMaterialColor("Final172")} />
      <mesh name="Final173" geometry={nodes.Final173.geometry} material={nodes.Final173.material} material-color={getMaterialColor("Final173")} />
      <mesh name="Final174" geometry={nodes.Final174.geometry} material={nodes.Final174.material} material-color={getMaterialColor("Final174")} />
      <mesh name="Final175" geometry={nodes.Final175.geometry} material={nodes.Final175.material} material-color={getMaterialColor("Final175")} />
      <mesh name="Final176" geometry={nodes.Final176.geometry} material={nodes.Final176.material} material-color={getMaterialColor("Final176")} />
      <mesh name="Final177" geometry={nodes.Final177.geometry} material={nodes.Final177.material} material-color={getMaterialColor("Final177")} />
      <mesh name="Final178" geometry={nodes.Final178.geometry} material={nodes.Final178.material} material-color={getMaterialColor("Final178")} />
      <mesh name="Final179" geometry={nodes.Final179.geometry} material={nodes.Final179.material} material-color={getMaterialColor("Final179")} />
      <mesh name="Final180" geometry={nodes.Final180.geometry} material={nodes.Final180.material} material-color={getMaterialColor("Final180")} />
      <mesh name="Final181" geometry={nodes.Final181.geometry} material={nodes.Final181.material} material-color={getMaterialColor("Final181")} />
      <mesh name="Final182" geometry={nodes.Final182.geometry} material={nodes.Final182.material} material-color={getMaterialColor("Final182")} />
      <mesh name="Final183" geometry={nodes.Final183.geometry} material={nodes.Final183.material} material-color={getMaterialColor("Final183")} />
      <mesh name="Final184" geometry={nodes.Final184.geometry} material={nodes.Final184.material} material-color={getMaterialColor("Final184")} />
      <mesh name="Final185" geometry={nodes.Final185.geometry} material={nodes.Final185.material} material-color={getMaterialColor("Final185")} />
      <mesh name="Final186" geometry={nodes.Final186.geometry} material={nodes.Final186.material} material-color={getMaterialColor("Final186")} />
      <mesh name="Final187" geometry={nodes.Final187.geometry} material={nodes.Final187.material} material-color={getMaterialColor("Final187")} />
      <mesh name="Final188" geometry={nodes.Final188.geometry} material={nodes.Final188.material} material-color={getMaterialColor("Final188")} />
      <mesh name="Final189" geometry={nodes.Final189.geometry} material={nodes.Final189.material} material-color={getMaterialColor("Final189")} />
      <mesh name="Final190" geometry={nodes.Final190.geometry} material={nodes.Final190.material} material-color={getMaterialColor("Final190")} />
      <mesh name="Final191" geometry={nodes.Final191.geometry} material={nodes.Final191.material} material-color={getMaterialColor("Final191")} />
      <mesh name="Final192" geometry={nodes.Final192.geometry} material={nodes.Final192.material} material-color={getMaterialColor("Final192")} />
      <mesh name="Final193" geometry={nodes.Final193.geometry} material={nodes.Final193.material} material-color={getMaterialColor("Final193")} />
      <mesh name="Final194" geometry={nodes.Final194.geometry} material={nodes.Final194.material} material-color={getMaterialColor("Final194")} />
      <mesh name="Final195" geometry={nodes.Final195.geometry} material={nodes.Final195.material} material-color={getMaterialColor("Final195")} />
      <mesh name="Final196" geometry={nodes.Final196.geometry} material={nodes.Final196.material} material-color={getMaterialColor("Final196")} />
      <mesh name="Final197" geometry={nodes.Final197.geometry} material={nodes.Final197.material} material-color={getMaterialColor("Final197")} />
      <mesh name="Final198" geometry={nodes.Final198.geometry} material={nodes.Final198.material} material-color={getMaterialColor("Final198")} />
      <mesh name="Final199" geometry={nodes.Final199.geometry} material={nodes.Final199.material} material-color={getMaterialColor("Final199")} />
      <mesh name="Final200" geometry={nodes.Final200.geometry} material={nodes.Final200.material} material-color={getMaterialColor("Final200")} />
      <mesh name="Final201" geometry={nodes.Final201.geometry} material={nodes.Final201.material} material-color={getMaterialColor("Final201")} />
      <mesh name="Final202" geometry={nodes.Final202.geometry} material={nodes.Final202.material} material-color={getMaterialColor("Final202")} />
      <mesh name="Final203" geometry={nodes.Final203.geometry} material={nodes.Final203.material} material-color={getMaterialColor("Final203")} />
      <mesh name="Final204" geometry={nodes.Final204.geometry} material={nodes.Final204.material} material-color={getMaterialColor("Final204")} />
      <mesh name="Final205" geometry={nodes.Final205.geometry} material={nodes.Final205.material} material-color={getMaterialColor("Final205")} />
      <mesh name="Final206" geometry={nodes.Final206.geometry} material={nodes.Final206.material} material-color={getMaterialColor("Final206")} />
      <mesh name="Final207" geometry={nodes.Final207.geometry} material={nodes.Final207.material} material-color={getMaterialColor("Final207")} />
      <mesh name="Final208" geometry={nodes.Final208.geometry} material={nodes.Final208.material} material-color={getMaterialColor("Final208")} />
      <mesh name="Final209" geometry={nodes.Final209.geometry} material={nodes.Final209.material} material-color={getMaterialColor("Final209")} />
      <mesh name="Final210" geometry={nodes.Final210.geometry} material={nodes.Final210.material} material-color={getMaterialColor("Final210")} />
      <mesh name="Final211" geometry={nodes.Final211.geometry} material={nodes.Final211.material} material-color={getMaterialColor("Final211")} />
      <mesh name="Final212" geometry={nodes.Final212.geometry} material={nodes.Final212.material} material-color={getMaterialColor("Final212")} />
      <mesh name="Final213" geometry={nodes.Final213.geometry} material={nodes.Final213.material} material-color={getMaterialColor("Final213")} />
      <mesh name="Final214" geometry={nodes.Final214.geometry} material={nodes.Final214.material} material-color={getMaterialColor("Final214")} />
      <mesh name="Final215" geometry={nodes.Final215.geometry} material={nodes.Final215.material} material-color={getMaterialColor("Final215")} />
      <mesh name="Final216" geometry={nodes.Final216.geometry} material={nodes.Final216.material} material-color={getMaterialColor("Final216")} />
      <mesh name="Final217" geometry={nodes.Final217.geometry} material={nodes.Final217.material} material-color={getMaterialColor("Final217")} />
      <mesh name="Final218" geometry={nodes.Final218.geometry} material={nodes.Final218.material} material-color={getMaterialColor("Final218")} />
      <mesh name="Final219" geometry={nodes.Final219.geometry} material={nodes.Final219.material} material-color={getMaterialColor("Final219")} />
      <mesh name="Final220" geometry={nodes.Final220.geometry} material={nodes.Final220.material} material-color={getMaterialColor("Final220")} />
      <mesh name="Final221" geometry={nodes.Final221.geometry} material={nodes.Final221.material} material-color={getMaterialColor("Final221")} />
      <mesh name="Final222" geometry={nodes.Final222.geometry} material={nodes.Final222.material} material-color={getMaterialColor("Final222")} />
      <mesh name="Final223" geometry={nodes.Final223.geometry} material={nodes.Final223.material} material-color={getMaterialColor("Final223")} />
      <mesh name="Final224" geometry={nodes.Final224.geometry} material={nodes.Final224.material} material-color={getMaterialColor("Final224")} />
      <mesh name="Final225" geometry={nodes.Final225.geometry} material={nodes.Final225.material} material-color={getMaterialColor("Final225")} />
      <mesh name="Final226" geometry={nodes.Final226.geometry} material={nodes.Final226.material} material-color={getMaterialColor("Final226")} />
      <mesh name="Final227" geometry={nodes.Final227.geometry} material={nodes.Final227.material} material-color={getMaterialColor("Final227")} />
      <mesh name="Final228" geometry={nodes.Final228.geometry} material={nodes.Final228.material} material-color={getMaterialColor("Final228")} />
      <mesh name="Final229" geometry={nodes.Final229.geometry} material={nodes.Final229.material} material-color={getMaterialColor("Final229")} />
      <mesh name="Final230" geometry={nodes.Final230.geometry} material={nodes.Final230.material} material-color={getMaterialColor("Final230")} />
      <mesh name="Final231" geometry={nodes.Final231.geometry} material={nodes.Final231.material} material-color={getMaterialColor("Final231")} />
      <mesh name="Final232" geometry={nodes.Final232.geometry} material={nodes.Final232.material} material-color={getMaterialColor("Final232")} />
      <mesh name="Final233" geometry={nodes.Final233.geometry} material={nodes.Final233.material} material-color={getMaterialColor("Final233")} />
      <mesh name="Final234" geometry={nodes.Final234.geometry} material={nodes.Final234.material} material-color={getMaterialColor("Final234")} />
      <mesh name="Final235" geometry={nodes.Final235.geometry} material={nodes.Final235.material} material-color={getMaterialColor("Final235")} />
      <mesh name="Final236" geometry={nodes.Final236.geometry} material={nodes.Final236.material} material-color={getMaterialColor("Final236")} />
      <mesh name="Final237" geometry={nodes.Final237.geometry} material={nodes.Final237.material} material-color={getMaterialColor("Final237")} />
      <mesh name="Final238" geometry={nodes.Final238.geometry} material={nodes.Final238.material} material-color={getMaterialColor("Final238")} />
      <mesh name="Final239" geometry={nodes.Final239.geometry} material={nodes.Final239.material} material-color={getMaterialColor("Final239")} />
      <mesh name="Final240" geometry={nodes.Final240.geometry} material={nodes.Final240.material} material-color={getMaterialColor("Final240")} />
      <mesh name="Final241" geometry={nodes.Final241.geometry} material={nodes.Final241.material} material-color={getMaterialColor("Final241")} />
      <mesh name="Final242" geometry={nodes.Final242.geometry} material={nodes.Final242.material} material-color={getMaterialColor("Final242")} />
      <mesh name="Final243" geometry={nodes.Final243.geometry} material={nodes.Final243.material} material-color={getMaterialColor("Final243")} />
      <mesh name="Final244" geometry={nodes.Final244.geometry} material={nodes.Final244.material} material-color={getMaterialColor("Final244")} />
      <mesh name="Final245" geometry={nodes.Final245.geometry} material={nodes.Final245.material} material-color={getMaterialColor("Final245")} />
      <mesh name="Final246" geometry={nodes.Final246.geometry} material={nodes.Final246.material} material-color={getMaterialColor("Final246")} />
      <mesh name="Final247" geometry={nodes.Final247.geometry} material={nodes.Final247.material} material-color={getMaterialColor("Final247")} />
      <mesh name="Final248" geometry={nodes.Final248.geometry} material={nodes.Final248.material} material-color={getMaterialColor("Final248")} />
      <mesh name="Final249" geometry={nodes.Final249.geometry} material={nodes.Final249.material} material-color={getMaterialColor("Final249")} />
      <mesh name="Final250" geometry={nodes.Final250.geometry} material={nodes.Final250.material} material-color={getMaterialColor("Final250")} />
      <mesh name="Final251" geometry={nodes.Final251.geometry} material={nodes.Final251.material} material-color={getMaterialColor("Final251")} />
      <mesh name="Final252" geometry={nodes.Final252.geometry} material={nodes.Final252.material} material-color={getMaterialColor("Final252")} />
      <mesh name="Final253" geometry={nodes.Final253.geometry} material={nodes.Final253.material} material-color={getMaterialColor("Final253")} />
      <mesh name="Final254" geometry={nodes.Final254.geometry} material={nodes.Final254.material} material-color={getMaterialColor("Final254")} />
      <mesh name="Final255" geometry={nodes.Final255.geometry} material={nodes.Final255.material} material-color={getMaterialColor("Final255")} />
      <mesh name="Final256" geometry={nodes.Final256.geometry} material={nodes.Final256.material} material-color={getMaterialColor("Final256")} />
      <mesh name="Final257" geometry={nodes.Final257.geometry} material={nodes.Final257.material} material-color={getMaterialColor("Final257")} />
      <mesh name="Final258" geometry={nodes.Final258.geometry} material={nodes.Final258.material} material-color={getMaterialColor("Final258")} />
      <mesh name="Final259" geometry={nodes.Final259.geometry} material={nodes.Final259.material} material-color={getMaterialColor("Final259")} />
      <mesh name="Final260" geometry={nodes.Final260.geometry} material={nodes.Final260.material} material-color={getMaterialColor("Final260")} />
      <mesh name="Final261" geometry={nodes.Final261.geometry} material={nodes.Final261.material} material-color={getMaterialColor("Final261")} />
      <mesh name="Final262" geometry={nodes.Final262.geometry} material={nodes.Final262.material} material-color={getMaterialColor("Final262")} />
      <mesh name="Final263" geometry={nodes.Final263.geometry} material={nodes.Final263.material} material-color={getMaterialColor("Final263")} />
      <mesh name="Final264" geometry={nodes.Final264.geometry} material={nodes.Final264.material} material-color={getMaterialColor("Final264")} />
    </group>
  );
}