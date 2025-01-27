"use client";

import { useState } from "react";

import { Setting, Coffee, Stamp } from "@assets/icons";
import Cups from "./Cups";
import { CardProps } from "src/types/subscription";
import { CARD_STYLES } from "../_utils/CardStyles";
import { getBottomSpacing } from "../_utils/CardHelpers";

import UseCardModal from "./modal/UseCardModal";
import FootModal from "./modal/FootModal";
import ManageModal from "./modal/ManageModal";

const Card = ({
  user_subscription_id,
  cafe_name,
  menu,
  period,
  price,
  saved_cups,
  is_used,
  visit,
  start,
  end,
  remaining_days,
  backgroundClass,
  showDetails,
  total,
}: CardProps) => {
  const [showUseModal, setShowUseModal] = useState(false);
  const [showFootModal, setShowFootModal] = useState(false);
  const [showManageModal, setShowManageModal] = useState(false);

  const manageModalProps = {
    user_subscription_id,
    menu,
    period,
    price,
    start,
    end,
    visit,
    remaining_days,
  };

  // 사용 완료 -> 발자국 모달 바꾸기
  const switchModal = (showFootModal: boolean) => {
    setShowUseModal(false);
    if (showFootModal) {
      setShowFootModal(true);
    }
  };

  const bottomSpacing = getBottomSpacing(total);

  return (
    <div
      className={`${CARD_STYLES.common.cardContainer} ${backgroundClass} cursor-pointer`}
    >
      <p className="Headline_3 text-white inline-flex gap-3 items-center mb-1">
        {cafe_name}
        <Setting
          onClick={() => {
            setShowManageModal(true);
          }}
        />
      </p>

      {/*카드 선택시에만 보여지는 정보 */}
      {showDetails && (
        <>
          <p className="Body_1_bold text-white">
            {menu}∙{period}주권
          </p>

          {/* 구독권 사용 버튼 or 스탬프 */}
          {is_used ? (
            <Stamp className="absolute -top-5 -right-10 " />
          ) : (
            <div
              onClick={(e) => {
                e.stopPropagation();
                setShowUseModal(true);
              }}
              className="absolute top-6 right-6 flex flex-col justify-center items-center py-4 px-3 rounded-xl w-fit bg-white cursor-pointer"
            >
              <Coffee className="w-[3.125rem]" />
              <p className="Caption_bold text-Main_Blue">구독권 사용하기</p>
            </div>
          )}

          {/* 이득 정보 */}
          <div className={`absolute flex gap-2 ${bottomSpacing}`}>
            <Cups count={saved_cups} />
          </div>

          {/* 구독권 사용 모달 */}
          <UseCardModal
            isOpen={showUseModal}
            onClose={() => setShowUseModal(false)}
            cafe_name={cafe_name}
            user_subscription_id={user_subscription_id}
            onComplete={switchModal}
          />

          {/* 구독권 관리 모달 */}
          <ManageModal
            isOpen={showManageModal}
            onClose={() => setShowManageModal(false)}
            cafe_name={cafe_name}
            {...manageModalProps}
          />

          {/* 발자국 도장 모달 */}
          <FootModal
            isOpen={showFootModal}
            onClose={() => setShowFootModal(false)}
            cafe_name={cafe_name}
          />
        </>
      )}
    </div>
  );
};

export default Card;
