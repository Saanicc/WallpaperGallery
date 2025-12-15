import {
  Category,
  ColorType,
  Orientation,
  PexelsImageSize,
  PexelsOrientation,
  PixabayImageOrder,
  PixabayOrientation,
} from "@/types/types";
import { useRouter } from "expo-router";
import {
  createContext,
  PropsWithChildren,
  useContext,
  useEffect,
  useMemo,
  useState,
} from "react";
import { useSettings } from "./settings-context";

interface FilterContextValue {
  query: string;
  setQuery: (query: string) => void;
  error: string | undefined;
  setError: (error: string | undefined) => void;
  order: PixabayImageOrder;
  setOrder: (order: PixabayImageOrder) => void;
  selectedOrientation: Orientation;
  setSelectedOrientation: (orientation: Orientation) => void;
  category: Category | "";
  setCategory: (category: Category | "") => void;
  color: ColorType | "";
  setColor: (color: ColorType | "") => void;
  editorsChoice: boolean;
  setEditorsChoice: (editorsChoice: boolean) => void;
  selectedSize: PexelsImageSize | "";
  setSelectedSize: (size: PexelsImageSize | "") => void;
  handleReset: () => void;
  handleSearch: () => void;
}

const FilterContext = createContext<FilterContextValue>({
  query: "",
  setQuery: () => {},
  error: undefined,
  setError: () => {},
  order: PixabayImageOrder.POPULAR,
  setOrder: () => {},
  selectedOrientation: PixabayOrientation.ALL,
  setSelectedOrientation: () => {},
  category: "",
  setCategory: () => {},
  color: "",
  setColor: () => {},
  editorsChoice: false,
  setEditorsChoice: () => {},
  selectedSize: "",
  setSelectedSize: () => {},
  handleReset: () => {},
  handleSearch: () => {},
});

export const FilterContextProvider = ({ children }: PropsWithChildren) => {
  const router = useRouter();
  const { wallpaperProvider } = useSettings();

  const [query, setQuery] = useState("");
  const [error, setError] = useState<string | undefined>(undefined);
  const [order, setOrder] = useState<PixabayImageOrder>(
    PixabayImageOrder.POPULAR
  );
  const [selectedOrientation, setSelectedOrientation] = useState<Orientation>(
    wallpaperProvider === "pixabay"
      ? PixabayOrientation.ALL
      : PexelsOrientation.ALL
  );
  const [category, setCategory] = useState<Category | "">("");
  const [color, setColor] = useState<ColorType | "">("");
  const [editorsChoice, setEditorsChoice] = useState(false);
  const [selectedSize, setSelectedSize] = useState<PexelsImageSize | "">("");

  useEffect(() => {
    handleReset();
  }, [wallpaperProvider]);

  const handleSearch = () => {
    if (wallpaperProvider === "pexels") {
      if (!query && !category) {
        setError("Pexels requires a search query or category");
        return;
      }
    }
    if (query.trim() || query === "") {
      setError(undefined);

      router.push({
        pathname: "/wallpapers/list",
        params: {
          query: query.trim(),
          color: color === "" ? undefined : color,
          orientation:
            selectedOrientation !== PixabayOrientation.ALL &&
            selectedOrientation !== PexelsOrientation.ALL
              ? selectedOrientation
              : undefined,

          // Pixabay specific
          orderBy: wallpaperProvider === "pixabay" ? order : undefined,
          category: category === "" ? undefined : category,
          editorsChoice:
            wallpaperProvider === "pixabay" ? String(editorsChoice) : undefined,

          // Pexels specific
          size: selectedSize,
        },
      });
    }
  };

  const handleReset = () => {
    setError(undefined);
    setQuery("");
    setOrder(PixabayImageOrder.POPULAR);
    setSelectedOrientation(
      wallpaperProvider === "pixabay"
        ? PixabayOrientation.ALL
        : PexelsOrientation.ALL
    );
    setCategory("");
    setColor("");
    setSelectedSize("");
    setEditorsChoice(false);
  };

  const value = useMemo(() => {
    return {
      query,
      setQuery,
      error,
      setError,
      order,
      setOrder,
      selectedOrientation,
      setSelectedOrientation,
      category,
      setCategory,
      color,
      setColor,
      editorsChoice,
      setEditorsChoice,
      selectedSize,
      setSelectedSize,
      handleReset,
      handleSearch,
    };
  }, [
    query,
    setQuery,
    error,
    setError,
    order,
    setOrder,
    selectedOrientation,
    setSelectedOrientation,
    category,
    setCategory,
    color,
    setColor,
    editorsChoice,
    setEditorsChoice,
    selectedSize,
    setSelectedSize,
    handleReset,
    handleSearch,
  ]);

  return (
    <FilterContext.Provider value={value}>{children}</FilterContext.Provider>
  );
};

export const useFilterContext = () => {
  const context = useContext(FilterContext);

  if (context === undefined) {
    throw new Error("useFilterContext must be used within a FilterContext");
  }
  return context;
};
