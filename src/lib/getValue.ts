const getValue = (apiData:any, key: string) => {
    const found = apiData?.data.find((item: any) => item.key == key) ?? null;
    if (found?.value || found?.image || found?.url) {
      return {
        value: found?.value ?? null,
        image: found?.image ?? null,
        url: found?.url ?? null,
      }
    } else {
      return null;
    }
  }

  export default getValue;