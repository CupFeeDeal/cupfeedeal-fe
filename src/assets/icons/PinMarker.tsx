import * as React from "react";
import type { SVGProps } from "react";
const SvgPinMarker = (props: SVGProps<SVGSVGElement>) => (
  <svg
    xmlns="http://www.w3.org/2000/svg"
    fill="none"
    viewBox="0 0 66 72"
    {...props}
  >
    <g filter="url(#PinMarker_svg__a)">
      <mask id="PinMarker_svg__b" fill="#fff">
        <path
          fillRule="evenodd"
          d="M36.94 52.691c.15-.258.404-.44.696-.507 8.861-2.054 15.466-9.998 15.466-19.484 0-11.046-8.955-20-20-20s-20 8.955-20 20c0 9.278 6.317 17.08 14.884 19.34.278.073.52.25.664.5l3.279 5.64a1.053 1.053 0 0 0 1.82 0z"
          clipRule="evenodd"
        />
      </mask>
      <path
        fill="#F2F4F6"
        fillRule="evenodd"
        d="M36.94 52.691c.15-.258.404-.44.696-.507 8.861-2.054 15.466-9.998 15.466-19.484 0-11.046-8.955-20-20-20s-20 8.955-20 20c0 9.278 6.317 17.08 14.884 19.34.278.073.52.25.664.5l3.279 5.64a1.053 1.053 0 0 0 1.82 0z"
        clipRule="evenodd"
      />
      <path
        fill="#1B7BE8"
        d="m31.929 58.18-.996.58zm-3.943-6.14.294-1.114zm.664.5.996-.58zm8.29.151.996.58zm15.01-19.99c0 8.937-6.224 16.425-14.574 18.36l.52 2.246c9.372-2.173 16.358-10.573 16.358-20.607zM33.101 13.851c10.409 0 18.847 8.439 18.847 18.848h2.305c0-11.682-9.47-21.152-21.152-21.152zM14.254 32.7c0-10.41 8.438-18.848 18.848-18.848v-2.304c-11.682 0-21.153 9.47-21.153 21.152zM28.28 50.926c-8.074-2.13-14.026-9.484-14.026-18.226h-2.305c0 9.814 6.682 18.064 15.743 20.454zm4.645 6.675-3.279-5.64-1.992 1.158 3.279 5.64zm3.019-5.489-3.191 5.489 1.992 1.158 3.19-5.489zm-5.011 6.647c.85 1.462 2.962 1.462 3.812 0l-1.992-1.158a.11.11 0 0 1 .086-.05q.018-.001.046.013a.1.1 0 0 1 .04.037zm-3.24-5.605c-.004 0-.023-.007-.039-.035l1.992-1.158a2.24 2.24 0 0 0-1.366-1.035zm9.683-2.092a2.24 2.24 0 0 0-1.432 1.05l1.992 1.158c-.017.03-.037.036-.04.036z"
        mask="url(#PinMarker_svg__b)"
      />
    </g>
    <path
      fill="#1B7BE8"
      d="M28.944 38.325a9 9 0 0 1-2.776.751.33.33 0 0 1-.32-.164c-.71-1.253-.944-2.812-.656-4.524.369-2.208 1.566-4.419 3.374-6.226 1.807-1.807 4.02-3.005 6.226-3.373 1.87-.31 3.557 0 4.863.87a.329.329 0 0 1-.102.593 10 10 0 0 0-1.79.612c-1.786.812-4.069 2.547-4.8 6.21-.502 2.483-1.853 4.25-4.02 5.251m12.41-10.836a.33.33 0 0 0-.318-.164 8.9 8.9 0 0 0-2.777.752c-2.166 1-3.517 2.767-4.014 5.25-.733 3.662-3.015 5.398-4.8 6.21a10 10 0 0 1-1.79.611.328.328 0 0 0-.102.6c.974.649 2.16.984 3.474.984q.7-.003 1.388-.118c2.208-.369 4.42-1.566 6.226-3.373 1.808-1.808 3.005-4.02 3.374-6.227.282-1.71.05-3.271-.66-4.525"
    />
    <defs>
      <filter
        id="PinMarker_svg__a"
        width={65.4}
        height={71.403}
        x={0.402}
        y={0}
        colorInterpolationFilters="sRGB"
        filterUnits="userSpaceOnUse"
      >
        <feFlood floodOpacity={0} result="BackgroundImageFix" />
        <feColorMatrix
          in="SourceAlpha"
          result="hardAlpha"
          values="0 0 0 0 0 0 0 0 0 0 0 0 0 0 0 0 0 0 127 0"
        />
        <feOffset />
        <feGaussianBlur stdDeviation={6.35} />
        <feComposite in2="hardAlpha" operator="out" />
        <feColorMatrix values="0 0 0 0 0.687683 0 0 0 0 0.69147 0 0 0 0 0.733122 0 0 0 0.31 0" />
        <feBlend
          in2="BackgroundImageFix"
          result="effect1_dropShadow_1219_15916"
        />
        <feBlend
          in="SourceGraphic"
          in2="effect1_dropShadow_1219_15916"
          result="shape"
        />
      </filter>
    </defs>
  </svg>
);
export default SvgPinMarker;
