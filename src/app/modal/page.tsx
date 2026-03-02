"use client";

import { useState } from "react";
import Link from "next/link";
import { usePathname } from "next/navigation";

export default function ModalPage() {
  const pathname = usePathname();
  const [isLoggedIn] = useState(false);
  const [loginName] = useState("");
  const [showKyozoMenu, setShowKyozoMenu] = useState(false);

  return (
    <div className="relative min-h-screen w-full bg-[#b8c8d8] flex overflow-x-hidden">
      {/* Left Sidebar - Midnight Blue Theme */}
      <aside className="fixed left-[5px] top-[9px] h-[calc(100vh-18px)] w-[60px] md:left-[10px] md:top-[10px] md:h-[calc(100%-20px)] md:w-[85px] bg-[#1e293b]/95 md:bg-[#1e293b] rounded-[10px] md:rounded-[18px] z-40 flex flex-col items-center p-1.5 md:p-[9px] border-2 border-[#334155]">
        {/* Container with logo and navigation */}
        <div className="flex flex-col gap-[4.6px] md:gap-[5px] items-center w-full">
          {/* Logo Container */}
          <div className="flex flex-col gap-[5px] items-center pb-0 pt-2">
            <Link 
              href="/modal" 
              className={`relative shrink-0 size-[32px] md:size-[41px] rounded-lg transition-all flex items-center justify-center ${ 
                pathname === "/modal" 
                  ? "shadow-[0px_0px_0px_4px_#475569]" 
                  : "shadow-[0px_0px_0px_2px_#475569] hover:shadow-[0px_0px_0px_3px_#475569]"
              }`}
            >
              <div className="w-[22px] h-[22px] md:w-[28px] md:h-[28px]">
                <svg className="block size-full" fill="none" preserveAspectRatio="none" viewBox="0 0 305 258">
                  <g clipPath="url(#clip0_162_42)">
                    <path d="M177.117 -0.5L177.136 -0.499023L226.986 2.4834L227.251 2.49902L227.387 2.72656L252.391 44.7168L279.984 85.9668L279.993 85.9795L280.001 85.9922L305.432 129.448L305.579 129.699L305.433 129.952L280.115 173.477L280.106 173.491L280.098 173.504L252.387 214.683L228.368 258.115V258.535L227.834 258.499L177.087 255.088H126.668L77.2578 256.211L76.9766 256.218L76.8252 255.981L50.6396 215.119L50.6318 215.107L50.625 215.095L26.3965 171.97L-0.420898 129.983L-0.587891 129.723L-0.429688 129.458L25.0869 86.7373L49.2158 43.5586L49.2217 43.5479L74.8369 0.120117L74.9834 -0.126953L75.2705 -0.125977L126.652 0.165039L177.099 -0.5H177.117ZM62.6543 54.5039L42.8105 93.3105L42.8037 93.3262L42.7949 93.3408L20.9473 129.699L42.9072 165.989L42.917 166.006L42.9258 166.022L62.6396 204.908L85.8369 241.194L129.685 244.587H174.076L219.255 243.471L240.364 204.514L240.38 204.486L263.567 167.551L284.033 129.71L262.269 92.6152L238.972 55.7344L238.965 55.7227L217.278 19.3203L174.092 19.0303L129.667 19.6963H129.646L129.626 19.6953L84.9053 16.7324L62.6543 54.5039Z" fill="#E2E8F0" stroke="#E2E8F0" />
                    <line stroke="#E2E8F0" strokeWidth="10" x1="82.6656" x2="155.666" y1="11.7698" y2="57.7698" />
                    <line stroke="#E2E8F0" strokeWidth="10" x1="214.672" x2="146.672" y1="20.226" y2="63.226" />
                    <line stroke="#E2E8F0" strokeWidth="10" x1="81.0005" x2="82.0005" y1="237.93" y2="166.93" />
                    <line stroke="#E2E8F0" strokeWidth="10" x1="85.9259" x2="220.926" y1="164.001" y2="162.001" />
                    <line stroke="#E2E8F0" strokeWidth="10" x1="226" x2="226" y1="159" y2="247" />
                    <line stroke="#E2E8F0" strokeWidth="10" x1="82.7298" x2="149.73" y1="169.399" y2="59.399" />
                    <line stroke="#E2E8F0" strokeWidth="10" x1="157.185" x2="225.185" y1="59.2638" y2="163.264" />
                  </g>
                  <defs>
                    <clipPath id="clip0_162_42">
                      <rect fill="white" height="258" width="305" />
                    </clipPath>
                  </defs>
                </svg>
              </div>
            </Link>
            <p className="font-extrabold leading-[15px] text-[#e2e8f0] text-[14px] md:text-[16px] text-center tracking-[-0.5px]">
              Modal
            </p>
          </div>

          {/* Navigation List */}
          <div className="flex flex-col gap-[10px] md:gap-6 items-center px-1 md:px-[6px] w-full mt-2">
            <Link 
              href="/modal" 
              className={`content-stretch flex flex-col items-center justify-center rounded-[10px] md:rounded-[13px] shrink-0 w-[48px] h-[48px] md:size-[60px] transition-colors ${
                pathname === "/modal" 
                  ? "bg-[#475569] border-[1.5px] md:border-[2.22px] border-[#475569]" 
                  : "bg-[#334155] hover:bg-[#475569]"
              }`}
            >
              <p className="font-semibold leading-[9px] md:leading-[11px] text-[#e2e8f0] text-[9px] md:text-[11.35px] text-center tracking-[-0.3px] md:tracking-[-0.37px]">
                Home
              </p>
            </Link>
          </div>
        </div>

        {/* Bottom Section: Switch to Willer & Kyozo Home */}
        <div className="mt-auto flex flex-col gap-3 md:gap-4 items-center pb-2">
          {/* Switch to Willer Universe */}
          <Link 
            href="/"
            className="bg-[#334155] content-stretch flex flex-col items-center justify-center rounded-[10px] md:rounded-[13px] shrink-0 w-[48px] h-[48px] md:size-[60px] hover:bg-[#475569] transition-colors"
          >
            <p className="font-semibold leading-[9px] md:leading-[11px] text-[#e2e8f0] text-[8px] md:text-[9px] text-center tracking-[-0.3px] md:tracking-[-0.37px] px-0.5">
              Switch to<br />Willer
            </p>
          </Link>

          {/* Kyozo Home */}
          <button
            onClick={() => setShowKyozoMenu(!showKyozoMenu)}
            className="relative bg-[#334155] content-stretch flex flex-col items-center justify-center rounded-[10px] md:rounded-[13px] shrink-0 w-[48px] h-[48px] md:size-[60px] hover:bg-[#475569] transition-colors"
          >
            <div className="flex items-center justify-center w-[24px] h-[28px] md:w-[31px] md:h-[37px] mb-0.5">
              <svg className="block size-full" fill="none" preserveAspectRatio="none" viewBox="0 0 106 128">
                <path d="M16.2551 0.00155462C16.5139 0.00155464 16.7331 0.0212229 16.9459 0.0631434C17.4594 0.16458 17.8153 0.534094 17.8973 1.0506C17.945 1.34973 17.8962 1.64576 17.8608 1.86209C17.8608 1.86209 17.8523 1.9154 17.8491 1.93506C17.8083 2.19694 17.744 2.4495 17.6824 2.69429C17.6282 2.90906 17.5768 3.11194 17.5457 3.30238C17.4782 3.71382 17.4112 4.80015 17.3838 5.26851C17.4208 5.26851 17.4599 5.26851 17.5017 5.26851C17.5714 5.26851 17.6406 5.26851 17.7103 5.26851C17.7783 5.26851 17.8458 5.26851 17.9134 5.26851C18.0308 5.26851 18.1851 5.268 18.3384 5.26281C18.913 5.24366 19.5111 5.21829 20.0391 5.19657H20.0482C20.9336 5.1593 21.8496 5.12101 22.7495 5.10186C23.046 5.09564 23.3686 5.09255 23.7368 5.09255C24.1265 5.09255 24.5215 5.09616 24.9037 5.09928H24.9149C25.2922 5.10238 25.683 5.10599 26.063 5.10599C26.7828 5.10599 27.3563 5.09358 27.8682 5.06666C28.1962 5.04958 28.5146 4.96783 28.8517 4.88138C29.1781 4.79754 29.5142 4.71163 29.8809 4.67801C29.9761 4.66921 30.0616 4.66506 30.1414 4.66506C30.7635 4.66506 31.067 4.95852 31.2121 5.20434C31.3756 5.48123 31.3981 5.78707 31.4106 5.95114C31.4506 6.49197 31.4717 7.57569 31.4067 8.20294C31.3494 8.75515 31.0127 9.34565 30.2399 9.34565C29.9814 9.34565 29.7441 9.27528 29.5345 9.21368C29.445 9.18728 29.3603 9.16191 29.296 9.1495C28.2814 8.95129 27.1628 8.86278 25.669 8.86278C25.0269 8.86278 24.3719 8.87883 23.739 8.89437H23.7191C23.3922 8.90265 23.0663 8.91093 22.7426 8.91661C21.0124 8.94765 19.3107 8.9989 17.5403 9.07343C17.5066 9.07498 17.4723 9.07549 17.4369 9.07549C17.4176 9.07549 17.3983 9.07549 17.379 9.07498V12.9601C17.8967 12.9405 18.4231 12.9172 18.8942 12.8959C20.1886 12.8385 21.5259 12.779 22.8492 12.7764H22.8728C23.2668 12.7764 23.672 12.7945 24.0643 12.8121C24.454 12.8292 24.8549 12.8473 25.2386 12.8473C25.7827 12.8473 26.2131 12.8116 26.5936 12.7355C26.6729 12.7195 26.801 12.6734 26.9141 12.632C27.1698 12.5388 27.4597 12.4338 27.7717 12.4338C28.2803 12.4338 28.8581 12.7422 28.9541 13.607C29.0146 14.1494 29.0489 15.1063 29.0034 15.6674C28.9144 16.7697 28.1608 16.9022 27.8403 16.9084L27.7722 16.9094L27.7047 16.8985C26.3337 16.6812 24.8463 16.5803 23.025 16.5803C21.8518 16.5803 20.6957 16.6212 19.4136 16.6698C19.1933 16.6781 18.9736 16.6859 18.7533 16.6941L18.6975 16.6962C18.25 16.7122 17.789 16.7283 17.3313 16.7495L17.305 20.0405C17.789 20.0224 18.2607 20.0079 18.6675 19.9955C18.8562 19.9898 19.0657 19.9872 19.3085 19.9872C19.6468 19.9872 19.9962 19.9924 20.366 19.9981C20.7428 20.0038 21.1314 20.0095 21.5125 20.0095C22.2591 20.0095 23.2051 19.9903 23.8981 19.8418C23.9389 19.833 24.0461 19.7962 24.1318 19.7667C24.418 19.6684 24.7729 19.5463 25.1282 19.5463C25.6546 19.5463 26.0753 19.8325 26.2264 20.2925L26.2522 20.3707L26.4473 22.6644L26.4119 22.7804C26.4092 22.8011 26.406 22.8378 26.4039 22.8642C26.3819 23.11 26.3304 23.6866 25.7446 23.9137C25.5993 23.9702 25.4321 23.9976 25.2338 23.9976C24.916 23.9976 24.5392 23.9277 24.2069 23.8661C24.0605 23.8387 23.9094 23.8108 23.8279 23.8025C23.256 23.7419 22.6402 23.7134 21.8893 23.7134C21.2981 23.7134 20.693 23.7316 20.1082 23.7486C19.8702 23.7559 19.636 23.7626 19.4034 23.7683C19.1981 23.7735 18.9934 23.7771 18.7881 23.7813C18.2832 23.7911 17.7628 23.8009 17.2514 23.8304L17.2241 27.093C17.2364 27.093 17.2493 27.093 17.2616 27.093C17.5473 27.0893 17.8426 27.0852 18.1256 27.0728C18.8278 27.0423 19.6242 27.0071 20.329 26.8756C20.3875 26.8647 20.4668 26.8394 20.5504 26.8125C20.7278 26.7555 20.9476 26.6851 21.1877 26.6851C21.401 26.6851 22.1112 26.7571 22.2966 27.6799C22.4081 28.2362 22.4408 29.2603 22.3942 29.7702C22.3492 30.2649 22.0436 30.8534 21.3308 30.8838C21.3104 30.8849 21.289 30.8855 21.267 30.8855C21.0258 30.8855 20.7546 30.8296 20.4673 30.7711C20.2808 30.7327 20.0702 30.6894 19.9506 30.6826C19.83 30.676 19.7052 30.6728 19.569 30.6728C19.1997 30.6728 18.8106 30.698 18.4343 30.723C18.206 30.7379 17.9729 30.7531 17.7418 30.7634C17.5628 30.7711 17.3897 30.7717 17.2219 30.7726C17.2219 30.7726 17.1968 30.7726 17.1876 30.7726C17.1866 31.0589 17.1796 31.3441 17.1726 31.6219C17.1528 32.4179 17.1324 33.2402 17.2638 33.9746C17.2782 34.0548 17.319 34.2033 17.3586 34.3466C17.5478 35.0314 17.6588 35.5107 17.4916 35.9211C17.3318 36.3133 16.9395 36.5778 16.4421 36.6291C16.0755 36.667 15.5835 36.6896 15.1268 36.6896C14.8803 36.6896 14.6605 36.683 14.4734 36.6698L14.4515 36.6684C14.1417 36.6472 13.3179 36.5913 13.1067 35.8185C13.0124 35.4734 13.0981 35.0635 13.2294 34.5221C13.2616 34.3896 13.2921 34.2644 13.3039 34.1916C13.4492 33.2812 13.4395 32.3582 13.4299 31.3817V31.3616C13.4283 31.208 13.4267 31.0526 13.4256 30.8958C13.1206 30.8938 12.814 30.8855 12.5166 30.8772C12.1918 30.8677 11.8563 30.8585 11.5352 30.8585C11.2533 30.8585 11.0072 30.8657 10.7843 30.8809C10.6556 30.8895 10.468 30.9196 10.2274 30.9703C10.155 30.9852 10.0612 31.0153 9.96155 31.0469C9.73163 31.12 9.47114 31.2028 9.19134 31.2028C8.68217 31.2028 8.10545 30.8998 8.01325 30.0508C7.9586 29.548 7.9559 28.5224 8.00844 28.0183C8.09204 27.2058 8.66179 26.9165 9.16668 26.9165C9.4218 26.9165 9.66247 26.9838 9.87525 27.0433C9.98354 27.0738 10.0854 27.1023 10.1572 27.1126C10.5758 27.1742 11.0362 27.2017 11.6504 27.2017C11.9527 27.2017 12.2657 27.1949 12.5686 27.1887C12.8542 27.1825 13.1474 27.1763 13.4374 27.1753L13.462 23.9815L9.3473 24.0794C9.0268 24.1073 8.717 24.1161 8.41685 24.1249C7.94359 24.1384 7.49764 24.1508 7.06188 24.2372C6.98685 24.2522 6.82391 24.3076 6.6926 24.3526C6.32332 24.4784 6.08158 24.555 5.83824 24.555C5.26152 24.5534 4.75984 24.1275 4.67033 23.5634C4.57064 22.9351 4.56904 21.7148 4.66766 21.0999C4.77004 20.4623 5.23043 20.0664 5.86987 20.0664C6.11695 20.0664 6.35118 20.1228 6.55805 20.173C6.66364 20.1984 6.76389 20.2227 6.83302 20.231C7.48049 20.3086 8.22819 20.3464 9.11898 20.3464C10.0098 20.3464 10.9992 20.306 11.9168 20.2667C12.2255 20.2537 12.5284 20.2408 12.8232 20.2294C13.0552 20.2206 13.2895 20.2149 13.5178 20.2098L13.543 16.9451C12.6902 16.9865 11.8809 16.9927 11.1922 16.9927C10.8095 16.9927 10.4209 16.9907 10.0446 16.9881H10.0323C9.67481 16.986 9.2696 16.9834 8.88208 16.9834C8.01271 16.9834 7.34865 16.9959 6.72959 17.0238C6.2172 17.0466 5.74553 17.1418 5.24651 17.2422C4.874 17.3172 4.48971 17.3949 4.0813 17.442C3.97357 17.4544 3.85724 17.4663 3.73827 17.4663C3.11975 17.4663 2.6797 17.1154 2.56125 16.5275C2.44012 15.9261 2.46531 14.4278 2.60788 13.8099C2.66094 13.5791 2.9016 12.8266 3.76937 12.8261C4.02128 12.8261 4.25764 12.897 4.44737 12.9534C4.53635 12.9803 4.62048 13.0051 4.68267 13.0165C5.60562 13.1842 6.71188 13.2623 8.16334 13.2623C9.08148 13.2623 9.99692 13.2313 10.8824 13.2013L10.9081 13.2003C11.2163 13.1899 11.518 13.1795 11.8096 13.1713C12.083 13.1635 12.3659 13.1583 12.6157 13.1537C12.9368 13.148 13.2653 13.1418 13.5923 13.1304V9.20746L5.06482 9.3881C4.89385 9.40309 4.72287 9.41656 4.55136 9.43L4.53635 9.43104C3.77471 9.49109 1.55897 9.62045 1.28829 9.62045C0.696035 9.62045 0.25385 9.26648 0.105383 8.67388C0.0265941 8.35921 0.0228417 8.1905 0.0131941 7.74076C0.0131941 7.74076 0.00944232 7.5648 0.00837035 7.52237L0.00568912 7.42248C-0.0200379 6.59132 0.038384 6.21147 0.244737 5.8585C0.366941 5.64943 0.670844 5.29852 1.3301 5.29852C1.43301 5.29852 3.2146 5.39323 3.50888 5.42169C4.561 5.52468 5.63831 5.53867 6.55378 5.53867C6.88556 5.53867 7.21734 5.53658 7.54855 5.53451H7.57214C7.89855 5.53245 8.22442 5.53039 8.5503 5.53039C8.90673 5.53039 9.21923 5.53297 9.50597 5.53764L13.565 5.40358C13.5499 5.24315 13.5296 5.02476 13.5146 4.85447C13.4862 4.53051 13.3994 3.54407 13.3098 3.09537C13.2021 2.55507 13.0901 1.99665 13.0649 1.43513C13.0429 0.954334 13.1705 0.588438 13.4438 0.348301C13.7097 0.114894 14.0934 0.0196661 14.7688 0.0196662C14.913 0.0196662 15.0502 0.0238065 15.1718 0.0269117H15.1911C15.2678 0.0294993 15.3369 0.0315717 15.3932 0.0315717H15.4173C15.5261 0.0295013 15.6403 0.0238086 15.7614 0.0170806C15.919 0.00880006 16.0819 -1.45755e-08 16.2545 0L16.2551 0.00155462Z" fill="#E2E8F0" />
              </svg>
            </div>
            <p className="font-semibold leading-[9px] md:leading-[11px] text-[#e2e8f0] text-[8px] md:text-[9px] text-center tracking-[-0.3px] md:tracking-[-0.37px] px-0.5">
              Kyozo<br />Home
            </p>
          </button>
        </div>
      </aside>

      {/* Kyozo Popup Menu */}
      {showKyozoMenu && (
        <>
          {/* Backdrop */}
          <div 
            className="fixed inset-0 bg-black/10 z-30"
            onClick={() => setShowKyozoMenu(false)}
          />
          
          {/* Popup Menu - Modal Theme */}
          <div className="fixed left-[23px] bottom-[90px] md:left-[33px] md:bottom-[110px] z-40 w-[280px]">
            <div className="bg-[#1e293b] content-stretch flex flex-col items-start p-px rounded-[8px] shadow-[0px_4px_6px_0px_rgba(0,0,0,0.3),0px_2px_4px_0px_rgba(0,0,0,0.2)] border-2 border-[#334155]">
              <div className="bg-[#1e293b] content-stretch flex flex-col h-auto items-start overflow-clip relative rounded-[10px] shadow-[0px_10px_15px_-3px_rgba(0,0,0,0.3),0px_4px_6px_-4px_rgba(0,0,0,0.2)] shrink-0 w-full">
                {/* Sign in */}
                <button 
                  onClick={() => {
                    setShowKyozoMenu(false);
                  }}
                  className="w-full h-[45px] flex items-center justify-between px-[16px] pb-px border-b border-[rgba(255,255,255,0.1)] hover:bg-[#334155] transition-colors"
                >
                  <p className="font-medium leading-[20px] text-[#e2e8f0] text-[13px] tracking-[-0.1504px]">
                    Sign in
                  </p>
                  <div className="relative shrink-0 size-[16px]">
                    <svg className="block size-full" fill="none" preserveAspectRatio="none" viewBox="0 0 16 16">
                      <path d="M6 12L10 8L6 4" stroke="#94a3b8" strokeLinecap="round" strokeLinejoin="round" strokeWidth="1.33333" />
                    </svg>
                  </div>
                </button>

                {/* Kyozo overview */}
                <button 
                  onClick={() => {
                    setShowKyozoMenu(false);
                  }}
                  className="w-full h-[45px] flex items-center justify-between px-[16px] pb-px border-b border-[rgba(255,255,255,0.1)] hover:bg-[#334155] transition-colors"
                >
                  <p className="font-medium leading-[20px] text-[#e2e8f0] text-[13px] tracking-[-0.1504px]">
                    Kyozo overview
                  </p>
                  <div className="relative shrink-0 size-[16px]">
                    <svg className="block size-full" fill="none" preserveAspectRatio="none" viewBox="0 0 16 16">
                      <path d="M6 12L10 8L6 4" stroke="#94a3b8" strokeLinecap="round" strokeLinejoin="round" strokeWidth="1.33333" />
                    </svg>
                  </div>
                </button>

                {/* Explore Artists & Communities */}
                <button 
                  onClick={() => {
                    setShowKyozoMenu(false);
                  }}
                  className="w-full h-[45px] flex items-center justify-between px-[16px] pb-px border-b border-[rgba(255,255,255,0.1)] hover:bg-[#334155] transition-colors"
                >
                  <p className="font-medium leading-[20px] text-[#e2e8f0] text-[13px] tracking-[-0.1504px]">
                    Explore Artists & Communities
                  </p>
                  <div className="relative shrink-0 size-[16px]">
                    <svg className="block size-full" fill="none" preserveAspectRatio="none" viewBox="0 0 16 16">
                      <path d="M6 12L10 8L6 4" stroke="#94a3b8" strokeLinecap="round" strokeLinejoin="round" strokeWidth="1.33333" />
                    </svg>
                  </div>
                </button>

                {/* Join the waitlist */}
                <button 
                  onClick={() => {
                    setShowKyozoMenu(false);
                  }}
                  className="w-full h-[44px] flex items-center justify-between px-[16px] hover:bg-[#334155] transition-colors"
                >
                  <p className="font-medium leading-[20px] text-[#e2e8f0] text-[13px] tracking-[-0.1504px]">
                    Join the waitlist
                  </p>
                  <div className="relative shrink-0 size-[16px]">
                    <svg className="block size-full" fill="none" preserveAspectRatio="none" viewBox="0 0 16 16">
                      <path d="M6 12L10 8L6 4" stroke="#94a3b8" strokeLinecap="round" strokeLinejoin="round" strokeWidth="1.33333" />
                    </svg>
                  </div>
                </button>
              </div>
            </div>
          </div>
        </>
      )}

      {/* Main Content */}
      <div className="flex-1 ml-[70px] md:ml-[105px] w-[calc(100%-70px)] md:w-auto">
        {/* Background overlay */}
        <div className="absolute inset-0 pointer-events-none">
          <div className="absolute bg-[rgba(200,210,220,0.6)] inset-0 mix-blend-overlay" />
        </div>

        {/* Header */}
        <header className="sticky top-0 z-50 backdrop-blur-[2px] px-2 md:px-12 pt-[13px] pb-2 md:py-4">
          <div className="max-w-[1632px] mx-auto flex items-center justify-end gap-3 md:gap-8">
            {/* Sign In Button - Styled for Modal */}
            {!isLoggedIn && (
              <div className="flex items-center gap-0 flex-shrink-0">
                <button
                  className="backdrop-blur-[4px] bg-[#475569] border-2 border-[#64748b] px-3 md:px-4 py-1.5 md:py-2 rounded-[9px] md:rounded-[14px] font-bold text-xs md:text-sm text-white hover:bg-[#334155] transition-colors h-[40px]"
                >
                  Sign in
                </button>
              </div>
            )}
            {isLoggedIn && (
              <div className="flex items-center gap-2 md:gap-3 bg-gradient-to-br from-[#475569] to-[#334155] px-2 md:px-4 py-1.5 md:py-2 rounded-xl shadow-md h-[32px] md:h-[40px]">
                <div className="size-6 md:size-8 rounded-full bg-[#64748b] flex items-center justify-center text-white font-bold text-xs md:text-sm">
                  {loginName.charAt(0).toUpperCase()}
                </div>
                <span className="font-medium text-xs md:text-sm text-white hidden sm:inline">{loginName}</span>
              </div>
            )}
          </div>
        </header>

        {/* Page Content */}
        <div className="relative min-h-screen px-4 md:px-12 py-8 md:py-16 flex items-center justify-center">
          <div className="text-center">
            <h1 className="text-4xl md:text-6xl font-bold text-[#1e293b]">
              Modal coming soon.
            </h1>
          </div>
        </div>
      </div>
    </div>
  );
}
