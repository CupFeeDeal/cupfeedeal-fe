import { privateApi } from "./client";
import { Cafe, CafeDetail } from "src/types/search";

export const searchApi = {
  // getCafes: async (query?: string, like?: boolean) => {
  //   let url = `/api/v1/cafe?`;
  //   // 검색어 params
  //   if (query && query.trim() !== "") {
  //     url += `search=${encodeURIComponent(query)}&`;
  //   }
  //   // 좋아요 params
  //   if (like == true) {
  //     url += `like=${like}`;
  //   }

  //   const response = await privateApi.get<Cafe[]>(url);
  //   return response.result;
  // },

  getCafes: async (query?: string, like?: boolean) => {
    let url = `/api/v1/cafe`;

    const params: string[] = [];

    // 검색어 추가
    if (query && query.trim() !== "") {
      params.push(`search=${encodeURIComponent(query)}`);
    }

    // 좋아요 필터 추가 (like=true만 추가)
    if (like === true) {
      params.push(`like=${like}`);
    }

    // 최종 URL 생성
    const finalUrl = params.length > 0 ? `${url}?${params.join("&")}` : url;
    console.log("finalUrl: ", finalUrl);
    // API 호출
    const response = await privateApi.get<Cafe[]>(finalUrl);
    return response.result;
  },

  getCafeDetail: async (cafeId: number) => {
    const response = await privateApi.get<CafeDetail>(`/api/v1/cafe/${cafeId}`);
    return response.result;
  },
};

export const likeApi = {
  postLike: async (cafeId: number) => {
    const response = await privateApi.post<{ cafeId: number }>(
      `/api/v1/like/like`,
      { cafeId: cafeId }
    );
    return response.result;
  },

  deleteLike: async (cafeId: number) => {
    const response = await privateApi.delete(`/api/v1/like/like`, {
      cafeId: cafeId,
    });
    return response.result;
  },
};
