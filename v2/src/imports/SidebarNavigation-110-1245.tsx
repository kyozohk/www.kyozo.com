import svgPaths from "./svg-hs9nmjokmr";
const imgImageWillerUniverse = "https://images.unsplash.com/photo-1535713875002-d1d0cf377fde?w=200&h=200&fit=crop";

function ImageWillerUniverse() {
  return (
    <div className="relative rounded-[16777200px] shadow-[0px_0px_0px_2px_#e8dfd0] shrink-0 size-[41px]" data-name="Image (Willer Universe)">
      <div aria-hidden="true" className="absolute bg-clip-padding border-0 border-[transparent] border-solid inset-0 pointer-events-none rounded-[16777200px]">
        <div className="absolute bg-[rgba(255,255,255,0)] bg-clip-padding border-0 border-[transparent] border-solid inset-0 rounded-[16777200px]" />
        <img alt="" className="absolute bg-clip-padding border-0 border-[transparent] border-solid max-w-none object-cover rounded-[16777200px] size-full" src={imgImageWillerUniverse} />
      </div>
    </div>
  );
}

function Container() {
  return (
    <div className="content-stretch flex flex-col gap-[12px] h-[116px] items-center pb-[1.5px] pt-[4px] relative shrink-0 w-full" data-name="Container">
      <div aria-hidden="true" className="absolute border-[#e8dfd0] border-b-[1.5px] border-solid inset-0 pointer-events-none" />
      <ImageWillerUniverse />
      <div className="font-['Inter:Extra_Bold',sans-serif] font-extrabold leading-[15px] not-italic relative shrink-0 text-[#4f4949] text-[16px] text-center tracking-[-0.5px] whitespace-nowrap">
        <p className="mb-0">{`Willer `}</p>
        <p>Universe</p>
      </div>
    </div>
  );
}

function Component() {
  return (
    <div className="relative shrink-0 size-[36px]" data-name="Component 1">
      <svg className="block size-full" fill="none" preserveAspectRatio="none" viewBox="0 0 36 36">
        <g id="Component 1">
          <g id="Frame 27795">
            <path d={svgPaths.p3b6c2900} fill="var(--fill-0, #4F4949)" id="Union" />
            <path d={svgPaths.p1f172980} fill="var(--fill-0, #4F4949)" id="Union (Stroke)" />
          </g>
          <g id="Union_2" />
          <g id="Frame 49365">
            <g filter="url(#filter0_g_109_345)" id="Vector">
              <path d={svgPaths.p816f8c0} fill="var(--fill-0, #4F4949)" />
            </g>
            <g filter="url(#filter1_g_109_345)" id="Vector_2">
              <path d={svgPaths.pbcd200} fill="var(--fill-0, #4F4949)" />
            </g>
            <g filter="url(#filter2_g_109_345)" id="Vector_3">
              <path d={svgPaths.p1ec8ae00} fill="var(--fill-0, #4F4949)" />
            </g>
          </g>
          <g id="Frame 49366">
            <path d={svgPaths.p379c19a0} fill="var(--fill-0, #4F4949)" id="Union_3" />
            <path d={svgPaths.p12920a80} fill="var(--fill-0, #4F4949)" id="Union (Stroke)_2" />
          </g>
        </g>
        <defs>
          <filter colorInterpolationFilters="sRGB" filterUnits="userSpaceOnUse" height="5.04" id="filter0_g_109_345" width="5.04" x="7.14998" y="15.48">
            <feFlood floodOpacity="0" result="BackgroundImageFix" />
            <feBlend in="SourceGraphic" in2="BackgroundImageFix" mode="normal" result="shape" />
            <feTurbulence baseFrequency="0.41666668653488159 0.41666668653488159" numOctaves="3" seed="4584" type="fractalNoise" />
            <feDisplacementMap height="100%" in="shape" result="displacedImage" scale="0.47999995946884155" width="100%" xChannelSelector="R" yChannelSelector="G" />
            <feMerge result="effect1_texture_109_345">
              <feMergeNode in="displacedImage" />
            </feMerge>
          </filter>
          <filter colorInterpolationFilters="sRGB" filterUnits="userSpaceOnUse" height="5.00609" id="filter1_g_109_345" width="10.1801" x="12.9098" y="15.48">
            <feFlood floodOpacity="0" result="BackgroundImageFix" />
            <feBlend in="SourceGraphic" in2="BackgroundImageFix" mode="normal" result="shape" />
            <feTurbulence baseFrequency="0.41666668653488159 0.41666668653488159" numOctaves="3" seed="4584" type="fractalNoise" />
            <feDisplacementMap height="100%" in="shape" result="displacedImage" scale="0.47999995946884155" width="100%" xChannelSelector="R" yChannelSelector="G" />
            <feMerge result="effect1_texture_109_345">
              <feMergeNode in="displacedImage" />
            </feMerge>
          </filter>
          <filter colorInterpolationFilters="sRGB" filterUnits="userSpaceOnUse" height="5.04" id="filter2_g_109_345" width="5.04" x="23.8101" y="15.48">
            <feFlood floodOpacity="0" result="BackgroundImageFix" />
            <feBlend in="SourceGraphic" in2="BackgroundImageFix" mode="normal" result="shape" />
            <feTurbulence baseFrequency="0.41666668653488159 0.41666668653488159" numOctaves="3" seed="4584" type="fractalNoise" />
            <feDisplacementMap height="100%" in="shape" result="displacedImage" scale="0.47999995946884155" width="100%" xChannelSelector="R" yChannelSelector="G" />
            <feMerge result="effect1_texture_109_345">
              <feMergeNode in="displacedImage" />
            </feMerge>
          </filter>
        </defs>
      </svg>
    </div>
  );
}

function ListItem() {
  return (
    <div className="bg-white content-stretch flex flex-col items-center justify-center relative rounded-[13.168px] shrink-0 size-[60px]" data-name="List Item">
      <Component />
      <div className="flex flex-col font-['Inter:Semi_Bold',sans-serif] font-semibold justify-center leading-[0] not-italic relative shrink-0 text-[#4f4949] text-[11.348px] text-center tracking-[-0.3696px] whitespace-nowrap">
        <p className="leading-[11.087px]">About</p>
      </div>
    </div>
  );
}

function Component1() {
  return (
    <div className="relative shrink-0 size-[34px]" data-name="Component 2">
      <svg className="block size-full" fill="none" preserveAspectRatio="none" viewBox="0 0 34 34">
        <g id="Component 2">
          <g id="Union" />
          <g filter="url(#filter0_g_109_330)" id="Group 27800">
            <g id="Vector">
              <path d={svgPaths.p3e191032} fill="var(--fill-0, #4F4949)" />
              <path d={svgPaths.p1ec02700} stroke="var(--stroke-0, #4F4949)" strokeWidth="0.406435" />
            </g>
          </g>
        </g>
        <defs>
          <filter colorInterpolationFilters="sRGB" filterUnits="userSpaceOnUse" height="32.4219" id="filter0_g_109_330" width="12.8374" x="10.5813" y="0.789059">
            <feFlood floodOpacity="0" result="BackgroundImageFix" />
            <feBlend in="SourceGraphic" in2="BackgroundImageFix" mode="normal" result="shape" />
            <feTurbulence baseFrequency="0.12302104383707047 0.12302104383707047" numOctaves="3" seed="6171" type="fractalNoise" />
            <feDisplacementMap height="100%" in="shape" result="displacedImage" scale="1.6257380247116089" width="100%" xChannelSelector="R" yChannelSelector="G" />
            <feMerge result="effect1_texture_109_330">
              <feMergeNode in="displacedImage" />
            </feMerge>
          </filter>
        </defs>
      </svg>
    </div>
  );
}

function ListItem1() {
  return (
    <div className="bg-[#e8dfd0] content-stretch flex flex-col gap-[2px] h-[60px] items-center justify-center px-[14.413px] py-[7.022px] relative rounded-[16.261px] shrink-0 w-[64px]" data-name="List Item">
      <div aria-hidden="true" className="absolute border-[#e8dfd0] border-[2.217px] border-solid inset-[-1.109px] pointer-events-none rounded-[17.369999999999997px]" />
      <Component1 />
      <div className="flex flex-col font-['Inter:Semi_Bold',sans-serif] font-semibold justify-center leading-[0] not-italic relative shrink-0 text-[#4f4949] text-[11.348px] text-center tracking-[-0.3696px] whitespace-nowrap">
        <p className="leading-[11.087px]">Feed</p>
      </div>
    </div>
  );
}

function Component2() {
  return (
    <div className="relative shrink-0 size-[30.916px]" data-name="Component 1">
      <svg className="block size-full" fill="none" preserveAspectRatio="none" viewBox="0 0 30.9157 30.9157">
        <g id="Component 1">
          <g id="Union" />
          <g id="Group 27798">
            <path d={svgPaths.p34d77080} fill="var(--fill-0, #3A3630)" id="Vector" stroke="var(--stroke-0, #3A3630)" strokeLinecap="round" strokeLinejoin="round" strokeWidth="2.21739" />
            <path d={svgPaths.p3f012300} id="Vector_2" stroke="var(--stroke-0, #3A3630)" strokeLinecap="round" strokeLinejoin="round" strokeWidth="2.21739" />
            <path d={svgPaths.p28826c40} id="Vector_3" stroke="var(--stroke-0, #3A3630)" strokeLinecap="round" strokeLinejoin="round" strokeWidth="2.21739" />
          </g>
        </g>
      </svg>
    </div>
  );
}

function ListItem2() {
  return (
    <div className="bg-white content-stretch flex flex-col gap-[1.478px] items-center justify-center relative rounded-[13.168px] shrink-0 size-[60px]" data-name="List Item">
      <Component2 />
      <div className="flex flex-col font-['Inter:Semi_Bold',sans-serif] font-semibold justify-center leading-[0] not-italic relative shrink-0 text-[#4f4949] text-[11.348px] text-center tracking-[-0.3696px] whitespace-nowrap">
        <p className="leading-[11.087px]">Community</p>
      </div>
    </div>
  );
}

function Group3() {
  return (
    <div className="h-[14.41px] relative shrink-0 w-[23.448px]">
      <div className="absolute inset-[-20%_-12.29%]">
        <svg className="block size-full" fill="none" preserveAspectRatio="none" viewBox="0 0 29.2119 20.1734">
          <g id="Group 27796">
            <g filter="url(#filter0_g_109_319)" id="Ellipse 1">
              <circle cx="10.0867" cy="10.0867" r="8.51472" stroke="var(--stroke-0, #3A3630)" strokeLinecap="round" strokeLinejoin="round" strokeWidth="2.61992" />
            </g>
            <g filter="url(#filter1_g_109_319)" id="Ellipse 2">
              <circle cx="19.1253" cy="10.0867" r="8.51472" stroke="var(--stroke-0, #3A3630)" strokeLinecap="round" strokeLinejoin="round" strokeWidth="2.61992" />
            </g>
          </g>
          <defs>
            <filter colorInterpolationFilters="sRGB" filterUnits="userSpaceOnUse" height="20.1733" id="filter0_g_109_319" width="20.1733" x="-5.96046e-08" y="-5.96046e-08">
              <feFlood floodOpacity="0" result="BackgroundImageFix" />
              <feBlend in="SourceGraphic" in2="BackgroundImageFix" mode="normal" result="shape" />
              <feTurbulence baseFrequency="0.25446110963821411 0.25446110963821411" numOctaves="3" seed="7734" type="fractalNoise" />
              <feDisplacementMap height="100%" in="shape" result="displacedImage" scale="0.52398312091827393" width="100%" xChannelSelector="R" yChannelSelector="G" />
              <feMerge result="effect1_texture_109_319">
                <feMergeNode in="displacedImage" />
              </feMerge>
            </filter>
            <filter colorInterpolationFilters="sRGB" filterUnits="userSpaceOnUse" height="20.1733" id="filter1_g_109_319" width="20.1733" x="9.03859" y="1.09076e-05">
              <feFlood floodOpacity="0" result="BackgroundImageFix" />
              <feBlend in="SourceGraphic" in2="BackgroundImageFix" mode="normal" result="shape" />
              <feTurbulence baseFrequency="0.25446110963821411 0.25446110963821411" numOctaves="3" seed="7734" type="fractalNoise" />
              <feDisplacementMap height="100%" in="shape" result="displacedImage" scale="0.52398312091827393" width="100%" xChannelSelector="R" yChannelSelector="G" />
              <feMerge result="effect1_texture_109_319">
                <feMergeNode in="displacedImage" />
              </feMerge>
            </filter>
          </defs>
        </svg>
      </div>
    </div>
  );
}

function Join() {
  return (
    <div className="bg-white content-stretch flex flex-col items-center justify-center overflow-clip relative shrink-0 size-[33.261px]" data-name="join">
      <Group3 />
    </div>
  );
}

function ListItem3() {
  return (
    <div className="bg-white content-stretch flex flex-col items-center justify-center relative rounded-[13.168px] shrink-0 size-[60px]" data-name="List Item">
      <Join />
      <div className="flex flex-col font-['Inter:Semi_Bold',sans-serif] font-semibold justify-center leading-[0] not-italic relative shrink-0 text-[#4f4949] text-[11.348px] text-center tracking-[-0.3696px] whitespace-nowrap">
        <p className="leading-[11.087px]">Join us</p>
      </div>
    </div>
  );
}

function List() {
  return (
    <div className="content-stretch flex flex-col gap-[24px] items-center px-[5.913px] relative shrink-0 w-[68px]" data-name="List">
      <ListItem />
      <ListItem1 />
      <ListItem2 />
      <ListItem3 />
    </div>
  );
}

function Frame6() {
  return (
    <div className="content-stretch flex flex-col gap-[5px] items-center relative shrink-0 w-full">
      <Container />
      <List />
    </div>
  );
}

function Icon() {
  return (
    <div className="h-[36.69px] overflow-clip relative shrink-0 w-full" data-name="Icon">
      <svg className="block size-full" fill="none" preserveAspectRatio="none" viewBox="0 0 31.4483 36.6896">
        <path d={svgPaths.p1b92c200} fill="var(--fill-0, #3F3F3F)" id="Vector" />
      </svg>
    </div>
  );
}

function Container1() {
  return (
    <div className="content-stretch flex flex-col h-[36.69px] items-start relative shrink-0 w-[31.448px]" data-name="Container">
      <Icon />
    </div>
  );
}

function ListItem4() {
  return (
    <div className="content-stretch flex flex-col items-center justify-center relative rounded-[13.168px] shrink-0 size-[60px]" data-name="List Item">
      <Container1 />
    </div>
  );
}

function ViewToggleGroup() {
  return (
    <div className="absolute bg-white h-[941px] left-[9px] rounded-[17.816px] top-[10px] w-[85px]" data-name="ViewToggleGroup">
      <div className="content-stretch flex flex-col items-center justify-between overflow-clip p-[9.276px] relative rounded-[inherit] size-full">
        <Frame6 />
        <ListItem4 />
      </div>
      <div aria-hidden="true" className="absolute border-2 border-[#e8dfd0] border-solid inset-[-1px] pointer-events-none rounded-[18.816px]" />
    </div>
  );
}

function Icon1() {
  return (
    <div className="relative size-[14.122px]" data-name="Icon">
      <div className="absolute inset-[-16.16%]">
        <svg className="block size-full" fill="none" preserveAspectRatio="none" viewBox="0 0 18.6854 18.6853">
          <g id="Icon">
            <g filter="url(#filter0_g_109_380)" id="Vector">
              <path d={svgPaths.p20529e00} stroke="var(--stroke-0, #3A3630)" strokeLinecap="round" strokeLinejoin="round" strokeWidth="2.09992" />
            </g>
            <g filter="url(#filter1_g_109_380)" id="Vector_2">
              <path d={svgPaths.p799f300} stroke="var(--stroke-0, #3A3630)" strokeLinecap="round" strokeLinejoin="round" strokeWidth="2.09992" />
            </g>
            <g filter="url(#filter2_g_109_380)" id="Vector_3">
              <path d={svgPaths.p2517af00} stroke="var(--stroke-0, #3A3630)" strokeLinecap="round" strokeLinejoin="round" strokeWidth="2.09992" />
            </g>
            <g filter="url(#filter3_g_109_380)" id="Vector_4">
              <path d={svgPaths.p1cf07100} stroke="var(--stroke-0, #3A3630)" strokeLinecap="round" strokeLinejoin="round" strokeWidth="2.09992" />
            </g>
          </g>
          <defs>
            <filter colorInterpolationFilters="sRGB" filterUnits="userSpaceOnUse" height="9.29047" id="filter0_g_109_380" width="9.29047" x="5.32717e-05" y="1.04308e-07">
              <feFlood floodOpacity="0" result="BackgroundImageFix" />
              <feBlend in="SourceGraphic" in2="BackgroundImageFix" mode="normal" result="shape" />
              <feTurbulence baseFrequency="0.36668741703033447 0.36668741703033447" numOctaves="3" seed="7734" type="fractalNoise" />
              <feDisplacementMap height="100%" in="shape" result="displacedImage" scale="0.36361578106880188" width="100%" xChannelSelector="R" yChannelSelector="G" />
              <feMerge result="effect1_texture_109_380">
                <feMergeNode in="displacedImage" />
              </feMerge>
            </filter>
            <filter colorInterpolationFilters="sRGB" filterUnits="userSpaceOnUse" height="9.29047" id="filter1_g_109_380" width="9.29047" x="9.3949" y="1.04308e-07">
              <feFlood floodOpacity="0" result="BackgroundImageFix" />
              <feBlend in="SourceGraphic" in2="BackgroundImageFix" mode="normal" result="shape" />
              <feTurbulence baseFrequency="0.36668741703033447 0.36668741703033447" numOctaves="3" seed="7734" type="fractalNoise" />
              <feDisplacementMap height="100%" in="shape" result="displacedImage" scale="0.36361578106880188" width="100%" xChannelSelector="R" yChannelSelector="G" />
              <feMerge result="effect1_texture_109_380">
                <feMergeNode in="displacedImage" />
              </feMerge>
            </filter>
            <filter colorInterpolationFilters="sRGB" filterUnits="userSpaceOnUse" height="9.29047" id="filter2_g_109_380" width="9.29047" x="1.04308e-07" y="9.39485">
              <feFlood floodOpacity="0" result="BackgroundImageFix" />
              <feBlend in="SourceGraphic" in2="BackgroundImageFix" mode="normal" result="shape" />
              <feTurbulence baseFrequency="0.36668741703033447 0.36668741703033447" numOctaves="3" seed="7734" type="fractalNoise" />
              <feDisplacementMap height="100%" in="shape" result="displacedImage" scale="0.36361578106880188" width="100%" xChannelSelector="R" yChannelSelector="G" />
              <feMerge result="effect1_texture_109_380">
                <feMergeNode in="displacedImage" />
              </feMerge>
            </filter>
            <filter colorInterpolationFilters="sRGB" filterUnits="userSpaceOnUse" height="9.29046" id="filter3_g_109_380" width="9.29047" x="9.39473" y="9.39486">
              <feFlood floodOpacity="0" result="BackgroundImageFix" />
              <feBlend in="SourceGraphic" in2="BackgroundImageFix" mode="normal" result="shape" />
              <feTurbulence baseFrequency="0.36668741703033447 0.36668741703033447" numOctaves="3" seed="7734" type="fractalNoise" />
              <feDisplacementMap height="100%" in="shape" result="displacedImage" scale="0.36361578106880188" width="100%" xChannelSelector="R" yChannelSelector="G" />
              <feMerge result="effect1_texture_109_380">
                <feMergeNode in="displacedImage" />
              </feMerge>
            </filter>
          </defs>
        </svg>
      </div>
    </div>
  );
}

function Frame() {
  return (
    <div className="bg-[#e8dfd0] relative rounded-[9.545px] shrink-0">
      <div aria-hidden="true" className="absolute border-[#e8dfd0] border-[2.386px] border-solid inset-0 pointer-events-none rounded-[10.738px]" />
      <div className="bg-clip-padding border-[1.193px] border-[transparent] border-solid content-stretch flex items-center justify-center p-[9.147px] relative">
        <div className="flex items-center justify-center relative shrink-0 size-[14.141px]" style={{ "--transform-inner-width": "1200", "--transform-inner-height": "19" } as React.CSSProperties}>
          <div className="flex-none rotate-[-0.08deg]">
            <Icon1 />
          </div>
        </div>
      </div>
    </div>
  );
}

function Group2() {
  return (
    <div className="h-[16.862px] relative shrink-0 w-[19.09px]">
      <div className="absolute inset-[-1.23%_-1.15%_-1.3%_-1.15%]">
        <svg className="block size-full" fill="none" preserveAspectRatio="none" viewBox="0 0 19.5292 17.289">
          <g id="Group 27795">
            <g id="Group 27793">
              <g filter="url(#filter0_g_109_366)" id="Vector">
                <path d={svgPaths.p1652c600} fill="var(--fill-0, #3A3630)" />
              </g>
              <g filter="url(#filter1_g_109_366)" id="Vector_2">
                <path d={svgPaths.p35618500} fill="var(--fill-0, #3A3630)" />
              </g>
              <g filter="url(#filter2_g_109_366)" id="Vector_3">
                <path d={svgPaths.p2176ca80} fill="var(--fill-0, #3A3630)" />
              </g>
              <g filter="url(#filter3_g_109_366)" id="Vector_4">
                <path d={svgPaths.p32f7c700} fill="var(--fill-0, #3A3630)" />
              </g>
              <g filter="url(#filter4_g_109_366)" id="Vector_5">
                <path d={svgPaths.p17322a80} fill="var(--fill-0, #3A3630)" />
              </g>
            </g>
            <g filter="url(#filter5_g_109_366)" id="Vector_6">
              <path d={svgPaths.p27e2fa00} fill="var(--fill-0, #3A3630)" />
            </g>
            <g filter="url(#filter6_g_109_366)" id="Vector_7">
              <path d={svgPaths.p1e504f40} fill="var(--fill-0, #3A3630)" />
            </g>
            <g filter="url(#filter7_g_109_366)" id="Vector_8">
              <path d={svgPaths.pd6c1700} fill="var(--fill-0, #3A3630)" />
            </g>
          </g>
          <defs>
            <filter colorInterpolationFilters="sRGB" filterUnits="userSpaceOnUse" height="2.96227" id="filter0_g_109_366" width="19.5291" x="4.86034e-09" y="10.3155">
              <feFlood floodOpacity="0" result="BackgroundImageFix" />
              <feBlend in="SourceGraphic" in2="BackgroundImageFix" mode="normal" result="shape" />
              <feTurbulence baseFrequency="0.45573112368583679 0.45573112368583679" numOctaves="3" seed="4584" type="fractalNoise" />
              <feDisplacementMap height="100%" in="shape" result="displacedImage" scale="0.43885529041290283" width="100%" xChannelSelector="R" yChannelSelector="G" />
              <feMerge result="effect1_texture_109_366">
                <feMergeNode in="displacedImage" />
              </feMerge>
            </filter>
            <filter colorInterpolationFilters="sRGB" filterUnits="userSpaceOnUse" height="2.82513" id="filter1_g_109_366" width="13.1657" x="5.56834" y="14.4639">
              <feFlood floodOpacity="0" result="BackgroundImageFix" />
              <feBlend in="SourceGraphic" in2="BackgroundImageFix" mode="normal" result="shape" />
              <feTurbulence baseFrequency="0.45573112368583679 0.45573112368583679" numOctaves="3" seed="4584" type="fractalNoise" />
              <feDisplacementMap height="100%" in="shape" result="displacedImage" scale="0.43885529041290283" width="100%" xChannelSelector="R" yChannelSelector="G" />
              <feMerge result="effect1_texture_109_366">
                <feMergeNode in="displacedImage" />
              </feMerge>
            </filter>
            <filter colorInterpolationFilters="sRGB" filterUnits="userSpaceOnUse" height="3.53604" id="filter2_g_109_366" width="6.55208" x="0.399594" y="1.14369e-09">
              <feFlood floodOpacity="0" result="BackgroundImageFix" />
              <feBlend in="SourceGraphic" in2="BackgroundImageFix" mode="normal" result="shape" />
              <feTurbulence baseFrequency="0.48076358437538147 0.48076358437538147" numOctaves="3" seed="4584" type="fractalNoise" />
              <feDisplacementMap height="100%" in="shape" result="displacedImage" scale="0.41600492596626282" width="100%" xChannelSelector="R" yChannelSelector="G" />
              <feMerge result="effect1_texture_109_366">
                <feMergeNode in="displacedImage" />
              </feMerge>
            </filter>
            <filter colorInterpolationFilters="sRGB" filterUnits="userSpaceOnUse" height="3.62056" id="filter3_g_109_366" width="7.59768" x="7.95464" y="0.146242">
              <feFlood floodOpacity="0" result="BackgroundImageFix" />
              <feBlend in="SourceGraphic" in2="BackgroundImageFix" mode="normal" result="shape" />
              <feTurbulence baseFrequency="0.45573112368583679 0.45573112368583679" numOctaves="3" seed="4584" type="fractalNoise" />
              <feDisplacementMap height="100%" in="shape" result="displacedImage" scale="0.43885529041290283" width="100%" xChannelSelector="R" yChannelSelector="G" />
              <feMerge result="effect1_texture_109_366">
                <feMergeNode in="displacedImage" />
              </feMerge>
            </filter>
            <filter colorInterpolationFilters="sRGB" filterUnits="userSpaceOnUse" height="3.1817" id="filter4_g_109_366" width="13.1657" x="5.04683" y="5.37836">
              <feFlood floodOpacity="0" result="BackgroundImageFix" />
              <feBlend in="SourceGraphic" in2="BackgroundImageFix" mode="normal" result="shape" />
              <feTurbulence baseFrequency="0.45573112368583679 0.45573112368583679" numOctaves="3" seed="4584" type="fractalNoise" />
              <feDisplacementMap height="100%" in="shape" result="displacedImage" scale="0.43885529041290283" width="100%" xChannelSelector="R" yChannelSelector="G" />
              <feMerge result="effect1_texture_109_366">
                <feMergeNode in="displacedImage" />
              </feMerge>
            </filter>
            <filter colorInterpolationFilters="sRGB" filterUnits="userSpaceOnUse" height="2.82513" id="filter5_g_109_366" width="5.21141" x="0.000503549" y="14.2102">
              <feFlood floodOpacity="0" result="BackgroundImageFix" />
              <feBlend in="SourceGraphic" in2="BackgroundImageFix" mode="normal" result="shape" />
              <feTurbulence baseFrequency="0.45573112368583679 0.45573112368583679" numOctaves="3" seed="4584" type="fractalNoise" />
              <feDisplacementMap height="100%" in="shape" result="displacedImage" scale="0.43885529041290283" width="100%" xChannelSelector="R" yChannelSelector="G" />
              <feMerge result="effect1_texture_109_366">
                <feMergeNode in="displacedImage" />
              </feMerge>
            </filter>
            <filter colorInterpolationFilters="sRGB" filterUnits="userSpaceOnUse" height="3.62056" id="filter6_g_109_366" width="3.62056" x="15.9087" y="0.146239">
              <feFlood floodOpacity="0" result="BackgroundImageFix" />
              <feBlend in="SourceGraphic" in2="BackgroundImageFix" mode="normal" result="shape" />
              <feTurbulence baseFrequency="0.45573112368583679 0.45573112368583679" numOctaves="3" seed="4584" type="fractalNoise" />
              <feDisplacementMap height="100%" in="shape" result="displacedImage" scale="0.43885529041290283" width="100%" xChannelSelector="R" yChannelSelector="G" />
              <feMerge result="effect1_texture_109_366">
                <feMergeNode in="displacedImage" />
              </feMerge>
            </filter>
            <filter colorInterpolationFilters="sRGB" filterUnits="userSpaceOnUse" height="3.30317" id="filter7_g_109_366" width="3.30317" x="0.762724" y="4.95065">
              <feFlood floodOpacity="0" result="BackgroundImageFix" />
              <feBlend in="SourceGraphic" in2="BackgroundImageFix" mode="normal" result="shape" />
              <feTurbulence baseFrequency="0.57520538568496704 0.57520538568496704" numOctaves="3" seed="4584" type="fractalNoise" />
              <feDisplacementMap height="100%" in="shape" result="displacedImage" scale="0.34770184755325317" width="100%" xChannelSelector="R" yChannelSelector="G" />
              <feMerge result="effect1_texture_109_366">
                <feMergeNode in="displacedImage" />
              </feMerge>
            </filter>
          </defs>
        </svg>
      </div>
    </div>
  );
}

function Frame3() {
  return (
    <div className="bg-[#f5f1e8] relative rounded-[9.545px] shrink-0 size-[34.203px]">
      <div aria-hidden="true" className="absolute border-[#f5f1e8] border-[2.386px] border-solid inset-0 pointer-events-none rounded-[10.738px]" />
      <div className="bg-clip-padding border-[1.193px] border-[transparent] border-solid content-stretch flex flex-col items-center justify-center p-[9.147px] relative size-full">
        <Group2 />
      </div>
    </div>
  );
}

function Frame1() {
  return (
    <div className="absolute h-[17.855px] left-0 top-0 w-[19.09px]">
      <svg className="block size-full" fill="none" preserveAspectRatio="none" viewBox="0 0 19.09 17.8551">
        <g id="Frame 49367">
          <g id="Union">
            <mask fill="white" id="path-1-inside-1_110_1249">
              <path d={svgPaths.p146a8880} />
            </mask>
            <path d={svgPaths.p146a8880} fill="var(--fill-0, #3A3630)" />
            <path d={svgPaths.p13fb6500} fill="var(--stroke-0, white)" mask="url(#path-1-inside-1_110_1249)" />
          </g>
          <g id="Union_2">
            <mask fill="white" id="path-3-inside-2_110_1249">
              <path d={svgPaths.pb2abf00} />
            </mask>
            <path d={svgPaths.pb2abf00} fill="var(--fill-0, #3A3630)" />
            <path d={svgPaths.p36ed2400} fill="var(--stroke-0, white)" mask="url(#path-3-inside-2_110_1249)" />
          </g>
          <g id="Union_3">
            <mask fill="white" id="path-5-inside-3_110_1249">
              <path d={svgPaths.p33647c00} />
            </mask>
            <path d={svgPaths.p33647c00} fill="var(--fill-0, #3A3630)" />
            <path d={svgPaths.p3d3a5d00} fill="var(--stroke-0, white)" mask="url(#path-5-inside-3_110_1249)" />
          </g>
        </g>
      </svg>
    </div>
  );
}

function Frame2() {
  return (
    <div className="col-1 h-[17.856px] ml-0 mt-0 relative row-1 w-[20.681px]">
      <Frame1 />
    </div>
  );
}

function Group() {
  return (
    <div className="grid-cols-[max-content] grid-rows-[max-content] inline-grid items-[start] justify-items-[start] leading-[0] relative shrink-0">
      <Frame2 />
    </div>
  );
}

function Frame4() {
  return (
    <div className="bg-[#f5f1e8] relative rounded-[9.545px] size-[34.203px]">
      <div aria-hidden="true" className="absolute border-[#f5f1e8] border-[2.386px] border-solid inset-0 pointer-events-none rounded-[10.738px]" />
      <div className="bg-clip-padding border-[1.193px] border-[transparent] border-solid content-stretch flex flex-col items-center justify-center p-[9.147px] relative size-full">
        <Group />
      </div>
    </div>
  );
}

function Group1() {
  return (
    <div className="col-1 h-[13.641px] ml-0 mt-0 relative row-1 w-[22.18px]">
      <div className="absolute inset-[-1.63%_0]">
        <svg className="block size-full" fill="none" preserveAspectRatio="none" viewBox="0 0 22.1802 14.0845">
          <g id="Group 27792">
            <g filter="url(#filter0_g_109_341)" id="Vector">
              <path d={svgPaths.p10fd4580} fill="var(--fill-0, #3A3630)" />
            </g>
            <g filter="url(#filter1_g_109_341)" id="Vector_2">
              <path d={svgPaths.pc0429a0} fill="var(--fill-0, #3A3630)" />
            </g>
          </g>
          <defs>
            <filter colorInterpolationFilters="sRGB" filterUnits="userSpaceOnUse" height="9.1219" id="filter0_g_109_341" width="9.1219" x="6.52926" y="4.96256">
              <feFlood floodOpacity="0" result="BackgroundImageFix" />
              <feBlend in="SourceGraphic" in2="BackgroundImageFix" mode="normal" result="shape" />
              <feTurbulence baseFrequency="0.45085158944129944 0.45085158944129944" numOctaves="3" seed="4584" type="fractalNoise" />
              <feDisplacementMap height="100%" in="shape" result="displacedImage" scale="0.443604975938797" width="100%" xChannelSelector="R" yChannelSelector="G" />
              <feMerge result="effect1_texture_109_341">
                <feMergeNode in="displacedImage" />
              </feMerge>
            </filter>
            <filter colorInterpolationFilters="sRGB" filterUnits="userSpaceOnUse" height="8.74834" id="filter1_g_109_341" width="21.9028" x="0.138712" y="0">
              <feFlood floodOpacity="0" result="BackgroundImageFix" />
              <feBlend in="SourceGraphic" in2="BackgroundImageFix" mode="normal" result="shape" />
              <feTurbulence baseFrequency="0.45085158944129944 0.45085158944129944" numOctaves="3" seed="4584" type="fractalNoise" />
              <feDisplacementMap height="100%" in="shape" result="displacedImage" scale="0.443604975938797" width="100%" xChannelSelector="R" yChannelSelector="G" />
              <feMerge result="effect1_texture_109_341">
                <feMergeNode in="displacedImage" />
              </feMerge>
            </filter>
          </defs>
        </svg>
      </div>
    </div>
  );
}

function Group4() {
  return (
    <div className="grid-cols-[max-content] grid-rows-[max-content] inline-grid items-[start] justify-items-[start] leading-[0] relative shrink-0">
      <Group1 />
    </div>
  );
}

function Frame5() {
  return (
    <div className="bg-[#f5f1e8] relative rounded-[9.545px] shrink-0 size-[34.203px]">
      <div aria-hidden="true" className="absolute border-[#f5f1e8] border-[2.386px] border-solid inset-0 pointer-events-none rounded-[10.738px]" />
      <div className="bg-clip-padding border-[1.193px] border-[transparent] border-solid content-stretch flex flex-col items-center justify-center p-[9.147px] relative size-full">
        <Group4 />
      </div>
    </div>
  );
}

function ViewToggleGroup1() {
  return (
    <div className="-translate-x-1/2 bg-[#f5f1e8] content-stretch flex h-[45px] items-center justify-between pointer-events-auto px-[8px] py-[5px] rounded-[18px] sticky top-0 w-[208px]" data-name="ViewToggleGroup">
      <div aria-hidden="true" className="absolute border-[#e8dfd0] border-[1.591px] border-solid inset-[-1.591px] pointer-events-none rounded-[19.591px]" />
      <Frame />
      <Frame3 />
      <div className="flex items-center justify-center relative shrink-0 size-[31.817px]" style={{ "--transform-inner-width": "1200", "--transform-inner-height": "19" } as React.CSSProperties}>
        <div className="flex-none rotate-90">
          <Frame4 />
        </div>
      </div>
      <Frame5 />
    </div>
  );
}

function Button() {
  return (
    <div className="absolute backdrop-blur-[4px] bg-[#62b7c8] content-stretch flex h-[40px] items-center justify-center left-[1074px] px-[16px] py-[9.276px] rounded-bl-[14px] rounded-tl-[14px] top-[20px] w-[80px]" data-name="Button">
      <div aria-hidden="true" className="absolute border-2 border-[#40b8d0] border-solid inset-[-1px] pointer-events-none rounded-bl-[15px] rounded-tl-[15px]" />
      <p className="font-['Inter:Bold',sans-serif] font-bold leading-[20px] not-italic relative shrink-0 text-[14px] text-center text-white tracking-[-0.1504px]">Join</p>
    </div>
  );
}

function Button1() {
  return (
    <div className="absolute backdrop-blur-[4px] bg-[#5293a1] content-stretch flex h-[40px] items-center left-[1153px] px-[16px] py-[9.276px] rounded-br-[14px] rounded-tr-[14px] top-[20px]" data-name="Button">
      <div aria-hidden="true" className="absolute border-2 border-[#40b8d0] border-solid inset-[-1px] pointer-events-none rounded-br-[15px] rounded-tr-[15px]" />
      <p className="font-['Inter:Bold',sans-serif] font-bold leading-[20px] not-italic relative shrink-0 text-[14px] text-center text-white tracking-[-0.1504px]">Sign in</p>
    </div>
  );
}

function Group5() {
  return (
    <div className="absolute contents left-[1074px] top-[20px]">
      <Button />
      <Button1 />
    </div>
  );
}

export default function SidebarNavigation() {
  return (
    <div className="bg-[#dfdbd2] relative size-full" data-name="Sidebar navigation">
      <ViewToggleGroup />
      <div className="absolute bottom-0 h-[944px] left-1/2 pointer-events-none top-[17px]">
        <ViewToggleGroup1 />
      </div>
      <Group5 />
    </div>
  );
}