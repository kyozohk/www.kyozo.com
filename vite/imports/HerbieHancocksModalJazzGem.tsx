import imgImg from "/assets/imgListenVertical.png";

function Span() {
  return (
    <div className="bg-[#926b7f] h-[22.398px] relative rounded-[16777200px] shrink-0 w-[46.336px]" data-name="span">
      <div className="bg-clip-padding border-0 border-[transparent] border-solid relative size-full">
        <p className="absolute font-['Inter:Medium',sans-serif] font-medium leading-[14.4px] left-[10px] not-italic text-[9.6px] text-white top-[3px] tracking-[0.3787px] uppercase whitespace-nowrap">Text</p>
      </div>
    </div>
  );
}

function Span1() {
  return (
    <div className="h-[15.75px] relative shrink-0 w-[125.977px]" data-name="span">
      <div className="bg-clip-padding border-0 border-[transparent] border-solid relative size-full">
        <p className="absolute font-['Inter:Regular',sans-serif] font-normal leading-[15.75px] left-0 not-italic text-[#3f3d3d] text-[10.5px] top-[-0.5px] tracking-[0.3548px] uppercase whitespace-nowrap">1 min read • Jan 2026</p>
      </div>
    </div>
  );
}

function Div() {
  return (
    <div className="absolute content-stretch flex gap-[8px] h-[22.398px] items-center left-[16px] top-[16px] w-[251px]" data-name="div">
      <Span />
      <Span1 />
    </div>
  );
}

function Img() {
  return (
    <div className="h-[115px] relative rounded-[10px] shrink-0 w-[90px]" data-name="img">
      <img alt="" className="absolute bg-clip-padding border-0 border-[transparent] border-solid inset-0 max-w-none object-cover pointer-events-none rounded-[10px] size-full" src={imgImg} />
    </div>
  );
}

function H() {
  return (
    <div className="flex-[1_0_0] h-[90px] min-h-px min-w-px relative" data-name="h3">
      <div className="bg-clip-padding border-0 border-[transparent] border-solid relative size-full">
        <div className="absolute font-['Inter:Bold',sans-serif] font-bold leading-[30px] left-0 not-italic text-[#4f4949] text-[28px] top-[0.6px] tracking-[-0.2472px] w-[148px]">
          <p className="mb-0">{`Herbie Hancock's`}</p>
          <p>{`Modal Jazz Gem `}</p>
        </div>
      </div>
    </div>
  );
}

function Div1() {
  return (
    <div className="absolute content-stretch flex gap-[12px] h-[90px] items-start left-[16px] top-[50.4px] w-[251px]" data-name="div">
      <Img />
      <H />
    </div>
  );
}

function P() {
  return (
    <div className="absolute h-[132px] left-[16px] top-[181px] w-[251px]" data-name="p">
      <p className="absolute font-['Inter:Regular',sans-serif] font-normal leading-[22px] left-0 not-italic text-[#5a5a5a] text-[14px] top-[0.5px] tracking-[-0.1504px] w-[238px]">{`Dive into modal jazz pure magic with Herbie Hancock's 'Maiden Voyage' (1965)—a five-note mode that sails…Dive into modal jazz pure magic with Herbie Hancock's 'Maiden Voyage' (1965)`}</p>
    </div>
  );
}

function Span2() {
  return (
    <div className="h-[18px] relative shrink-0 w-[140.898px]" data-name="span">
      <div className="bg-clip-padding border-0 border-[transparent] border-solid relative size-full">
        <p className="absolute font-['Inter:Semi_Bold',sans-serif] font-semibold leading-[18px] left-0 not-italic text-[#5a5a5a] text-[12px] top-px tracking-[0.3px] uppercase whitespace-nowrap">Read Full Article →</p>
      </div>
    </div>
  );
}

function Div2() {
  return (
    <div className="absolute content-stretch flex h-[18px] items-start justify-end left-[16px] top-[327px] w-[251px]" data-name="div">
      <Span2 />
    </div>
  );
}

export default function HerbieHancocksModalJazzGem() {
  return (
    <div className="bg-[#f5f1e8] relative rounded-[20px] size-full" data-name="Herbie Hancock's Modal Jazz Gem">
      <Div />
      <Div1 />
      <P />
      <Div2 />
    </div>
  );
}