const useProducts = () => {
  const config = useRuntimeConfig();

  const { data: licences } = useAsyncData("licences", (selectedRegion) => {
    if (!selectedRegion) return;
    return $fetch(
      ` ${config.DOMAIN}/api/licences/stock?region=${selectedRegion}`
    );
  });

  return { licences };
};
export default useProducts;
