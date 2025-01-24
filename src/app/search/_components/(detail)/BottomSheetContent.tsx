"use client";

import { FullHeart, EmptyHeart, Instagram } from "@assets/icons";
import useDistance from "@hooks/useDistance";
import useSelectedCafeStore from "@store/useSelectedCafeStore";
import { useEffect, useState } from "react";
import { CafeDetail } from "src/types/search";
import useMap from "../useMap";
import Image from "next/image";
import { token } from "@api/client";
import LoginModal from "../modal/LoginModal";
import { useRouter } from "next/navigation";
import { likeApi } from "@api/search";
import { useCafeListStore } from "@store/useCafeListStore";

interface BottomSheetContentProps {
  cafeInfo: CafeDetail | undefined;
}

const labelStyle = `Body_2_bold text-Dark_Blue min-w-[49px]`;
const valueStyle = `Body_2_med text-Grey-800`;
const heartStyle = `w-5 h-5 flex justify-center items-center cursor-pointer rounded-[0.625rem] shadow-[0_0_5px_0_rgba(153,153,159,0.26)]`;

function InfoRow({ label, value }: { label: string; value: string }) {
  return (
    <div className="flex flex-row justify-between items-start mb-3 z-25 gap-4">
      <span className={labelStyle}>{label}</span>
      <span className={`${valueStyle} w-[17.56rem]`}>{value}</span>
    </div>
  );
}

const BottomSheetContent = ({ cafeInfo }: BottomSheetContentProps) => {
  const router = useRouter();
  const accessToken = token.get();
  const [showLoginModal, setShowLoginModal] = useState(false);

  const [isLike, setIsLike] = useState(cafeInfo?.is_like || false);
  const { updateCafeLikeStatus } = useCafeListStore();

  useEffect(() => {
    if (cafeInfo) {
      setIsLike(cafeInfo.is_like);
    }
  }, [cafeInfo]);

  const handleClickSave = async () => {
    if (!accessToken) {
      setShowLoginModal(true);
      return;
    }

    if (cafeInfo) {
      try {
        if (isLike) {
          await likeApi.deleteLike(cafeInfo.id);
          console.log("delete");
        } else {
          await likeApi.postLike(cafeInfo.id);
          console.log("post");
        }

        const updatedIsLike = !isLike;
        setIsLike(updatedIsLike);

        updateCafeLikeStatus(cafeInfo.id, updatedIsLike);
      } catch (error) {
        console.log(error);
      }
    }
  };

  const { isSheetOpen } = useSelectedCafeStore();
  const { getDistance } = useDistance();
  const { getCurrentLocation } = useMap();
  const [distance, setDistance] = useState<number | null>(null);

  useEffect(() => {
    const calculateDistance = async () => {
      if (cafeInfo) {
        try {
          // 현재 위치 가져오기
          const [currentLat, currentLng] = await getCurrentLocation();

          // 거리 계산
          const calculatedDistance = getDistance(
            currentLat,
            currentLng,
            Number(cafeInfo.address_lat),
            Number(cafeInfo.address_lng)
          );
          setDistance(Math.round(calculatedDistance));
        } catch (error) {
          console.error("Failed to get current location:", error);
        }
      }
    };

    calculateDistance();
  }, [cafeInfo, getDistance, getCurrentLocation]);

  const formatDistance = () => {
    if (distance === null) {
      return "";
    }
    if (distance >= 1000) {
      return `${(distance / 1000).toFixed(2)}km`;
    }
    return `${distance}m`;
  };

  if (!cafeInfo) {
    return <div className="w-full h-full bg-white"></div>;
  }

  return (
    <>
      <div
        className={`bg-white z-30 overflow-scroll pb-[5.5rem] ${
          isSheetOpen ? "min-h-screen" : "max-h-full"
        } `}
      >
        <div className={`w-full px-5 ${isSheetOpen ? "pt-5" : ""}`}>
          {/*거리*/}
          <div className="Caption_bold text-Grey-500">{formatDistance()}</div>

          {/*이름 & 좋아요 여부*/}
          <div className="flex flex-row items-center my-1">
            <span className="Headline_3 mr-2">{cafeInfo.name}</span>
            <span>
              {isLike ? (
                <span
                  onClick={handleClickSave}
                  className={`${heartStyle} bg-Main_Blue`}
                >
                  <FullHeart width={11} height={11} />
                </span>
              ) : (
                <span className={`${heartStyle} bg-white`}>
                  <EmptyHeart
                    onClick={handleClickSave}
                    width={11}
                    height={11}
                  />
                </span>
              )}
            </span>
          </div>

          {/*메뉴 & 구독권 종류*/}
          <div className=" Body_2_bold text-Main_Blue mb-5">
            {[
              ...cafeInfo.menus,
              ...cafeInfo.periods.map((period) => `${period}주권`),
            ].join(" ∙ ")}
          </div>

          {/*대표 이미지*/}
          <div className="flex overflow-x-scroll w-full gap-3 mb-7">
            {cafeInfo.images.map((image, index) => (
              <Image
                key={index}
                src={image.image_url.trim()}
                alt={image.image_url}
                width={169}
                height={169}
                className=" rounded-xl object-cover shrink-0"
              />
            ))}
          </div>

          {/*세부 정보*/}
          <InfoRow label="주소" value={cafeInfo.address} />
          <InfoRow label="영업시간" value={cafeInfo.operation_time} />
          <InfoRow label="전화번호" value={cafeInfo.phone_num} />
          {/* <InfoRow label="SNS" value={cafeInfo.sns_address} /> */}
          <div className="flex flex-row justify-between items-center mb-3 z-25">
            <span className={labelStyle}>SNS</span>
            <span className="w-6 h-6 ml-4 mr-2 flex shrink-0">
              <Instagram className="w-full h-full" />
            </span>
            <span className={`${valueStyle} w-[17.56rem]`}>
              {cafeInfo.sns_address}
            </span>
          </div>

          {/*카페소개*/}
          <div className={`${labelStyle} mt-6`}>카페 소개</div>
          <div className={`${valueStyle} mt-2`}>{cafeInfo.description}</div>

          <div
            className={`flex w-full justify-center Body_1_bold rounded-xl px-6 py-[0.88rem] mt-[3.6rem] ${
              cafeInfo.is_subscription
                ? "bg-Main_Blue text-white cursor-pointer"
                : "bg-Grey-200 text-Grey-400"
            }`}
          >
            구독하기
          </div>
        </div>
      </div>
      <LoginModal
        isOpen={showLoginModal}
        onClose={() => setShowLoginModal(false)}
        onLogin={() => router.push("/")}
        message="즐겨찾기를 등록하려면"
      />
    </>
  );
};

export default BottomSheetContent;
