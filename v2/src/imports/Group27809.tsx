import clsx from "clsx";
import svgPaths from "./svg-yz0m3yj1hh";
const imgImageProfile = "https://images.unsplash.com/photo-1494790108377-be9c29b29330?w=200&h=200&fit=crop";
type ContainerProps = {
  additionalClassNames?: string;
};

function Container({ children, additionalClassNames = "" }: React.PropsWithChildren<ContainerProps>) {
  return (
    <div className={clsx("relative shrink-0 w-[56px]", additionalClassNames)}>
      <div className="bg-clip-padding border-0 border-[transparent] border-solid content-stretch flex items-center justify-center px-[4px] relative size-full">{children}</div>
    </div>
  );
}
type Wrapper2Props = {
  additionalClassNames?: string;
};

function Wrapper2({ children, additionalClassNames = "" }: React.PropsWithChildren<Wrapper2Props>) {
  return (
    <div className={clsx("relative shrink-0", additionalClassNames)}>
      <div className="bg-clip-padding border-0 border-[transparent] border-solid content-stretch flex items-center justify-center relative size-full">{children}</div>
    </div>
  );
}
type Wrapper1Props = {
  additionalClassNames?: string;
};

function Wrapper1({ children, additionalClassNames = "" }: React.PropsWithChildren<Wrapper1Props>) {
  return (
    <div className={additionalClassNames}>
      <div className="bg-clip-padding border-0 border-[transparent] border-solid relative size-full">{children}</div>
    </div>
  );
}
type WrapperProps = {
  additionalClassNames?: string;
};

function Wrapper({ children, additionalClassNames = "" }: React.PropsWithChildren<WrapperProps>) {
  return <Wrapper1 additionalClassNames={clsx("relative shrink-0", additionalClassNames)}>{children}</Wrapper1>;
}

function Button({ children }: React.PropsWithChildren<{}>) {
  return (
    <div className="h-[45px] relative shrink-0 w-full">
      <div aria-hidden="true" className="absolute border-[rgba(0,0,0,0.1)] border-b border-solid inset-0 pointer-events-none" />
      <div className="flex flex-row items-center size-full">
        <div className="content-stretch flex items-center justify-between pb-px px-[16px] relative size-full">{children}</div>
      </div>
    </div>
  );
}

function Icon() {
  return (
    <div className="relative shrink-0 size-[16px]">
      <svg className="absolute block size-full" fill="none" preserveAspectRatio="none" viewBox="0 0 16 16">
        <g id="Icon">
          <path d="M6 12L10 8L6 4" id="Vector" stroke="var(--stroke-0, #717182)" strokeLinecap="round" strokeLinejoin="round" strokeWidth="1.33333" />
        </g>
      </svg>
    </div>
  );
}
type TextTextProps = {
  text: string;
  additionalClassNames?: string;
};

function TextText({ text, additionalClassNames = "" }: TextTextProps) {
  return (
    <Wrapper1 additionalClassNames={clsx("h-[20px] relative shrink-0", additionalClassNames)}>
      <p className="absolute font-['Inter:Medium',sans-serif] font-medium leading-[20px] left-0 not-italic text-[#0a0a0a] text-[13px] top-[0.5px] tracking-[-0.1504px]">{text}</p>
    </Wrapper1>
  );
}

function Helper() {
  return (
    <div className="h-[5.813px] relative shrink-0 w-[20.693px]">
      <svg className="absolute block size-full" fill="none" preserveAspectRatio="none" viewBox="0 0 20.6933 5.81334">
        <g id="Frame 27795">
          <path d={svgPaths.p3ac88f00} fill="var(--fill-0, #3A3630)" id="Union" />
          <path d={svgPaths.p3db55400} fill="var(--fill-0, #3A3630)" id="Union (Stroke)" />
        </g>
      </svg>
    </div>
  );
}

export default function Group() {
  return (
    <div className="relative size-full">
      <div className="absolute h-[1000px] left-0 top-0 w-[80px]" data-name="Sidebar">
        <div className="absolute bg-white content-stretch flex flex-col h-[1000px] items-start left-0 p-[2px] rounded-[24px] top-0 w-[80px]" data-name="Sidebar">
          <div aria-hidden="true" className="absolute border-2 border-[#e8dfd0] border-solid inset-0 pointer-events-none rounded-[24px]" />
          <Wrapper2 additionalClassNames="h-[54px] w-full">
            <Wrapper2 additionalClassNames="h-[38px] rounded-[10px] w-[55px]">
              <div className="relative rounded-[16777200px] shadow-[0px_0px_0px_2px_#e8dfd0] shrink-0 size-[32px]" data-name="Image (Profile)">
                <div aria-hidden="true" className="absolute bg-clip-padding border-0 border-[transparent] border-solid inset-0 pointer-events-none rounded-[16777200px]">
                  <div className="absolute bg-[rgba(255,255,255,0)] bg-clip-padding border-0 border-[transparent] border-solid inset-0 rounded-[16777200px]" />
                  <img alt="" className="absolute bg-clip-padding border-0 border-[transparent] border-solid max-w-none object-cover rounded-[16777200px] size-full" src={imgImageProfile} />
                </div>
              </div>
            </Wrapper2>
          </Wrapper2>
          <div className="flex-[1_0_0] min-h-px min-w-px relative w-full" data-name="Navigation">
            <div className="bg-clip-padding border-0 border-[transparent] border-solid content-stretch flex flex-col gap-[8px] items-center pb-[485px] relative size-full">
              <div className="h-[34px] relative rounded-[10px] shrink-0 w-[56px]" data-name="Link">
                <div className="bg-clip-padding border-0 border-[transparent] border-solid content-stretch flex flex-col items-center relative size-full">
                  <Wrapper additionalClassNames="h-[12px] w-[32px]">
                    <p className="-translate-x-1/2 absolute font-['Inter_Tight:Bold',sans-serif] leading-[16px] left-[16px] not-italic text-[#4f4949] text-[12px] text-center top-[0.5px]">Willer</p>
                  </Wrapper>
                  <Wrapper additionalClassNames="h-[12px] w-[50px]">
                    <p className="-translate-x-1/2 absolute font-['Inter_Tight:Bold',sans-serif] leading-[16px] left-[25px] not-italic text-[#4f4949] text-[12px] text-center top-[0.5px] w-[50px] whitespace-pre-wrap">Universe</p>
                  </Wrapper>
                </div>
              </div>
              <Container additionalClassNames="h-[17px]">
                <div className="bg-[rgba(0,0,0,0.1)] flex-[1_0_0] h-px min-h-px min-w-px" data-name="Container" />
              </Container>
              <div className="relative shrink-0">
                <div className="bg-clip-padding border-0 border-[transparent] border-solid content-stretch flex flex-col gap-[12px] items-start relative">
                  <div className="content-stretch flex flex-col h-[62px] items-center justify-center relative rounded-[10px] shrink-0 w-[56px]" data-name="Link">
                    <div className="relative shrink-0 size-[32px]" data-name="Component 1">
                      <div className="flex flex-col items-center justify-center overflow-clip rounded-[inherit] size-full">
                        <div className="bg-clip-padding border-0 border-[transparent] border-solid content-stretch flex flex-col gap-[1.067px] items-center justify-center px-[0.853px] py-[2.347px] relative size-full">
                          <Helper />
                          <div className="h-[4.053px] relative shrink-0 w-[18.862px]">
                            <div className="absolute inset-[-5.26%_-1.13%]">
                              <svg className="block size-full" fill="none" preserveAspectRatio="none" viewBox="0 0 19.2889 4.48">
                                <g id="Frame 49365">
                                  <g filter="url(#filter0_g_174_331)" id="Vector">
                                    <path d={svgPaths.p34fb9080} fill="var(--fill-0, #3A3630)" />
                                  </g>
                                  <g filter="url(#filter1_g_174_331)" id="Vector_2">
                                    <path d={svgPaths.p29813280} fill="var(--fill-0, #3A3630)" />
                                  </g>
                                  <g filter="url(#filter2_g_174_331)" id="Vector_3">
                                    <path d={svgPaths.p13f2d100} fill="var(--fill-0, #3A3630)" />
                                  </g>
                                </g>
                                <defs>
                                  <filter colorInterpolationFilters="sRGB" filterUnits="userSpaceOnUse" height="4.48" id="filter0_g_174_331" width="4.48" x="0" y="0">
                                    <feFlood floodOpacity="0" result="BackgroundImageFix" />
                                    <feBlend in="SourceGraphic" in2="BackgroundImageFix" mode="normal" result="shape" />
                                    <feTurbulence baseFrequency="0.46874997019767761 0.46874997019767761" numOctaves="3" seed="4584" type="fractalNoise" />
                                    <feDisplacementMap height="100%" in="shape" result="displacedImage" scale="0.42666667699813843" width="100%" xChannelSelector="R" yChannelSelector="G" />
                                    <feMerge result="effect1_texture_174_331">
                                      <feMergeNode in="displacedImage" />
                                    </feMerge>
                                  </filter>
                                  <filter colorInterpolationFilters="sRGB" filterUnits="userSpaceOnUse" height="4.44986" id="filter1_g_174_331" width="9.04893" x="5.12" y="-4.52223e-09">
                                    <feFlood floodOpacity="0" result="BackgroundImageFix" />
                                    <feBlend in="SourceGraphic" in2="BackgroundImageFix" mode="normal" result="shape" />
                                    <feTurbulence baseFrequency="0.46874997019767761 0.46874997019767761" numOctaves="3" seed="4584" type="fractalNoise" />
                                    <feDisplacementMap height="100%" in="shape" result="displacedImage" scale="0.42666667699813843" width="100%" xChannelSelector="R" yChannelSelector="G" />
                                    <feMerge result="effect1_texture_174_331">
                                      <feMergeNode in="displacedImage" />
                                    </feMerge>
                                  </filter>
                                  <filter colorInterpolationFilters="sRGB" filterUnits="userSpaceOnUse" height="4.48" id="filter2_g_174_331" width="4.48" x="14.8089" y="0">
                                    <feFlood floodOpacity="0" result="BackgroundImageFix" />
                                    <feBlend in="SourceGraphic" in2="BackgroundImageFix" mode="normal" result="shape" />
                                    <feTurbulence baseFrequency="0.46874997019767761 0.46874997019767761" numOctaves="3" seed="4584" type="fractalNoise" />
                                    <feDisplacementMap height="100%" in="shape" result="displacedImage" scale="0.42666667699813843" width="100%" xChannelSelector="R" yChannelSelector="G" />
                                    <feMerge result="effect1_texture_174_331">
                                      <feMergeNode in="displacedImage" />
                                    </feMerge>
                                  </filter>
                                </defs>
                              </svg>
                            </div>
                          </div>
                          <Helper />
                        </div>
                      </div>
                    </div>
                    <Wrapper additionalClassNames="h-[16px] w-[33.914px]">
                      <p className="-translate-x-1/2 absolute font-['Inter_Tight:SemiBold',sans-serif] leading-[16px] left-[17.5px] not-italic text-[11px] text-[rgba(79,73,73,0.9)] text-center top-px">About</p>
                    </Wrapper>
                  </div>
                  <div className="content-stretch flex flex-col gap-[2px] h-[62px] items-center justify-center relative rounded-[10px] shrink-0 w-[56px]" data-name="Link">
                    <div className="flex items-center justify-center relative shrink-0">
                      <div className="flex-none rotate-180">
                        <div className="relative size-[32px]" data-name="Component 2">
                          <svg className="absolute block size-full" fill="none" preserveAspectRatio="none" viewBox="0 0 32 32">
                            <g id="Component 2">
                              <g id="Union" />
                              <g filter="url(#filter0_g_174_336)" id="Group 27800">
                                <g id="Vector">
                                  <path d={svgPaths.pb1b74f0} fill="var(--fill-0, #4F4949)" />
                                  <path d={svgPaths.p1310b200} stroke="var(--stroke-0, #4F4949)" strokeWidth="0.5" />
                                </g>
                              </g>
                            </g>
                            <defs>
                              <filter colorInterpolationFilters="sRGB" filterUnits="userSpaceOnUse" height="30.6322" id="filter0_g_174_336" width="12.1997" x="9.90039" y="0.68389">
                                <feFlood floodOpacity="0" result="BackgroundImageFix" />
                                <feBlend in="SourceGraphic" in2="BackgroundImageFix" mode="normal" result="shape" />
                                <feTurbulence baseFrequency="0.13070985674858093 0.13070985674858093" numOctaves="3" seed="6171" type="fractalNoise" />
                                <feDisplacementMap height="100%" in="shape" result="displacedImage" scale="1.5301064252853394" width="100%" xChannelSelector="R" yChannelSelector="G" />
                                <feMerge result="effect1_texture_174_336">
                                  <feMergeNode in="displacedImage" />
                                </feMerge>
                              </filter>
                            </defs>
                          </svg>
                        </div>
                      </div>
                    </div>
                    <p className="font-['Inter_Tight:SemiBold',sans-serif] leading-[16px] not-italic relative shrink-0 text-[11px] text-[rgba(79,73,73,0.9)] text-center">Feed</p>
                  </div>
                  <div className="content-stretch flex flex-col gap-[2px] h-[62px] items-center justify-center relative rounded-[10px] shrink-0 w-[56px]" data-name="Link">
                    <div className="relative shrink-0 size-[30.916px]" data-name="Component 1">
                      <svg className="absolute block size-full" fill="none" preserveAspectRatio="none" viewBox="0 0 30.9157 30.9157">
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
                    <p className="font-['Inter_Tight:SemiBold',sans-serif] leading-[16px] not-italic relative shrink-0 text-[11px] text-[rgba(79,73,73,0.9)] text-center">Community</p>
                  </div>
                  <div className="content-stretch flex flex-col gap-[2px] h-[62px] items-center justify-center relative rounded-[10px] shrink-0 w-[56px]" data-name="Link">
                    <div className="relative shrink-0 size-[33.261px]" data-name="join">
                      <svg className="absolute block size-full" fill="none" preserveAspectRatio="none" viewBox="0 0 33.2608 33.2608">
                        <g id="join">
                          <rect fill="white" height="33.2608" width="33.2608" />
                          <path d={svgPaths.p453b070} fill="var(--fill-0, #3F3F3F)" id="Vector" stroke="var(--stroke-0, #3F3F3F)" />
                          <rect fill="var(--fill-0, white)" height="4.1967" id="Rectangle 1" transform="rotate(33.2417 20.9311 15.8279)" width="13" x="20.9311" y="15.8279" />
                        </g>
                      </svg>
                    </div>
                    <p className="font-['Inter_Tight:SemiBold',sans-serif] leading-[16px] not-italic relative shrink-0 text-[12px] text-[rgba(79,73,73,0.9)] text-center">Modal</p>
                  </div>
                </div>
              </div>
              <Container additionalClassNames="h-[32px]">
                <div className="bg-[rgba(0,0,0,0.1)] flex-[1_0_0] h-px min-h-px min-w-px" data-name="Container" />
              </Container>
              <div className="h-[62px] relative rounded-[10px] shrink-0 w-[56px]" data-name="Link">
                <div className="bg-clip-padding border-0 border-[transparent] border-solid content-stretch flex flex-col gap-[2px] items-center justify-center relative size-full">
                  <div className="bg-white relative shrink-0 size-[33.261px]" data-name="join">
                    <div className="bg-clip-padding border-0 border-[transparent] border-solid content-stretch flex flex-col items-center justify-center overflow-clip relative rounded-[inherit] size-full">
                      <div className="h-[14.41px] relative shrink-0 w-[23.448px]">
                        <div className="absolute inset-[-20%_-12.29%]">
                          <svg className="block size-full" fill="none" preserveAspectRatio="none" viewBox="0 0 29.2119 20.1734">
                            <g id="Group 27796">
                              <g filter="url(#filter0_g_174_323)" id="Ellipse 1">
                                <circle cx="10.0867" cy="10.0867" r="8.51472" stroke="var(--stroke-0, #3A3630)" strokeLinecap="round" strokeLinejoin="round" strokeWidth="2.61992" />
                              </g>
                              <g filter="url(#filter1_g_174_323)" id="Ellipse 2">
                                <circle cx="19.1253" cy="10.0867" r="8.51472" stroke="var(--stroke-0, #3A3630)" strokeLinecap="round" strokeLinejoin="round" strokeWidth="2.61992" />
                              </g>
                            </g>
                            <defs>
                              <filter colorInterpolationFilters="sRGB" filterUnits="userSpaceOnUse" height="20.1733" id="filter0_g_174_323" width="20.1733" x="-5.96046e-08" y="-5.96046e-08">
                                <feFlood floodOpacity="0" result="BackgroundImageFix" />
                                <feBlend in="SourceGraphic" in2="BackgroundImageFix" mode="normal" result="shape" />
                                <feTurbulence baseFrequency="0.25446110963821411 0.25446110963821411" numOctaves="3" seed="7734" type="fractalNoise" />
                                <feDisplacementMap height="100%" in="shape" result="displacedImage" scale="0.52398312091827393" width="100%" xChannelSelector="R" yChannelSelector="G" />
                                <feMerge result="effect1_texture_174_323">
                                  <feMergeNode in="displacedImage" />
                                </feMerge>
                              </filter>
                              <filter colorInterpolationFilters="sRGB" filterUnits="userSpaceOnUse" height="20.1733" id="filter1_g_174_323" width="20.1733" x="9.03859" y="1.09076e-05">
                                <feFlood floodOpacity="0" result="BackgroundImageFix" />
                                <feBlend in="SourceGraphic" in2="BackgroundImageFix" mode="normal" result="shape" />
                                <feTurbulence baseFrequency="0.25446110963821411 0.25446110963821411" numOctaves="3" seed="7734" type="fractalNoise" />
                                <feDisplacementMap height="100%" in="shape" result="displacedImage" scale="0.52398312091827393" width="100%" xChannelSelector="R" yChannelSelector="G" />
                                <feMerge result="effect1_texture_174_323">
                                  <feMergeNode in="displacedImage" />
                                </feMerge>
                              </filter>
                            </defs>
                          </svg>
                        </div>
                      </div>
                    </div>
                  </div>
                  <p className="font-['Inter_Tight:SemiBold',sans-serif] leading-[16px] not-italic relative shrink-0 text-[11px] text-[rgba(79,73,73,0.9)] text-center">Join Us</p>
                </div>
              </div>
              <Container additionalClassNames="h-[32px]">
                <div className="bg-[rgba(0,0,0,0.1)] flex-[1_0_0] h-px min-h-px min-w-px" data-name="Container" />
              </Container>
            </div>
          </div>
          <Wrapper2 additionalClassNames="h-[72px] w-full">
            <div className="relative rounded-[13.168px] shrink-0 size-[60px]" data-name="List Item">
              <div className="bg-clip-padding border-0 border-[transparent] border-solid content-stretch flex flex-col items-center justify-center relative size-full">
                <div className="content-stretch flex flex-col h-[36.69px] items-start relative shrink-0 w-[31.448px]" data-name="Container">
                  <div className="h-[36.69px] overflow-clip relative shrink-0 w-full" data-name="Icon">
                    <svg className="absolute block size-full" fill="none" preserveAspectRatio="none" viewBox="0 0 31.4483 36.6896">
                      <path d={svgPaths.p1b92c200} fill="var(--fill-0, #3F3F3F)" id="Vector" />
                    </svg>
                  </div>
                </div>
              </div>
            </div>
          </Wrapper2>
        </div>
      </div>
      <div className="absolute h-[181px] left-[23px] top-[740px] w-[280px]" data-name="popup menu">
        <div className="absolute bg-white content-stretch flex flex-col h-[181px] items-start left-0 p-px rounded-[8px] top-0 w-[280px]" data-name="popup menu">
          <div aria-hidden="true" className="absolute border-2 border-[#e8dfd0] border-solid inset-0 pointer-events-none rounded-[8px] shadow-[0px_4px_6px_0px_rgba(0,0,0,0.1),0px_2px_4px_0px_rgba(0,0,0,0.1)]" />
          <div className="bg-white content-stretch flex flex-col h-[179px] items-start overflow-clip relative rounded-[10px] shadow-[0px_10px_15px_-3px_rgba(0,0,0,0.1),0px_4px_6px_-4px_rgba(0,0,0,0.1)] shrink-0 w-full" data-name="Container">
            <Button>
              <TextText text="Sign in" additionalClassNames="w-[104.875px]" />
              <Icon />
            </Button>
            <Button>
              <Wrapper additionalClassNames="h-[20px] w-[80.102px]">
                <p className="absolute font-['Inter:Medium',sans-serif] font-medium leading-[20px] left-[3px] not-italic text-[#0a0a0a] text-[13px] top-[0.5px] tracking-[-0.1504px]">Kyozo overview</p>
              </Wrapper>
              <Icon />
            </Button>
            <Button>
              <Wrapper additionalClassNames="h-[20px] w-[147.719px]">
                <p className="absolute font-['Inter:Medium',sans-serif] font-medium leading-[20px] left-px not-italic text-[#0a0a0a] text-[13px] top-[0.5px] tracking-[-0.1504px]">{`Explore Artists & Communities`}</p>
              </Wrapper>
              <Icon />
            </Button>
            <div className="h-[44px] relative shrink-0 w-full" data-name="Button">
              <div className="flex flex-row items-center size-full">
                <div className="content-stretch flex items-center justify-between px-[16px] relative size-full">
                  <TextText text="Join the waitlist" additionalClassNames="w-[103.211px]" />
                  <Icon />
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}