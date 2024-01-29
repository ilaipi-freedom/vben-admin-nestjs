export const pageOptions = (page: number, limit: number, isAll = false) => {
  if (isAll) return {} as any;
  return {
    take: Number(limit),
    skip: (page - 1) * limit,
  };
};
