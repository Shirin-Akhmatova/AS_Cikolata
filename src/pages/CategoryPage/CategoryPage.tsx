import { useEffect, useState, useRef } from "react";
import { useParams } from "react-router-dom";
import ChipsChoice from "../../components/ChipsChoice/ChipsChoice";
import ProductCard from "../../components/ProductCard/ProductCard";
import styles from "./CategoryPage.module.scss";
import { useLanguage } from "../../components/LanguageContext/LanguageContext";

interface Product {
  id: number;
  name: string;
  title?: string;
  description?: string;
  image: string;
  price: number;
  size?: string; // <-- добавлено
}

interface Category {
  id: number;
  name?: string;
  title?: string;
  subcategories?: Category[];
  products?: Product[];
}

const formatTurkishPlural = (name: string, language: string) => {
  if (language === "tr") {
    return name.replace(/'/g, "");
  }
  return name;
};

export default function CategoryPage() {
  const { id } = useParams<{ id: string }>();
  const { language } = useLanguage();

  const [allCategories, setAllCategories] = useState<Category[]>([]);
  const [currentCategory, setCurrentCategory] = useState<Category | null>(null);
  const [activeSubcategoryId, setActiveSubcategoryId] = useState<number | null>(
    null
  );

  const wrapperRef = useRef<HTMLDivElement | null>(null);
  const subRefs = useRef<HTMLButtonElement[]>([]);

  const findCategoryById = (data: Category[], id: number): Category | null => {
    for (const cat of data) {
      if (cat.id === id) return cat;
      if (cat.subcategories) {
        const found = findCategoryById(cat.subcategories, id);
        if (found) return found;
      }
    }
    return null;
  };

  useEffect(() => {
    console.log(allCategories);
  });

  useEffect(() => {
    fetch(`/api/menucategories/?lang=${language}`)
      .then((res) => {
        if (!res.ok) throw new Error("Ошибка загрузки категорий");
        return res.json();
      })
      .then((data: Category[]) => {
        setAllCategories(data);
        const cat = findCategoryById(data, Number(id));
        setCurrentCategory(cat || null);
        setActiveSubcategoryId(null);
      })
      .catch((err) => {
        console.error(err);
        setCurrentCategory(null);
      });
  }, [id, language]);

  if (!currentCategory) return null;

  const showSubcategories =
    currentCategory.subcategories && currentCategory.subcategories.length > 0;

  const displayedProducts = showSubcategories
    ? activeSubcategoryId !== null
      ? currentCategory.subcategories?.find(
          (sub) => sub.id === activeSubcategoryId
        )?.products || []
      : (currentCategory.subcategories || []).flatMap(
          (sub) => sub.products || []
        )
    : currentCategory.products || [];

  const handleSubClick = (subId: number | null, index: number) => {
    setActiveSubcategoryId(subId);

    requestAnimationFrame(() => {
      const wrapper = wrapperRef.current;
      const btn = subRefs.current[index];
      if (wrapper && btn) {
        const wrapperWidth = wrapper.clientWidth;
        const btnWidth = btn.offsetWidth;
        const btnLeft = btn.offsetLeft;
        const scrollTo = btnLeft - wrapperWidth / 2 + btnWidth / 2;
        wrapper.scrollTo({ left: scrollTo, behavior: "smooth" });
      }
    });
  };

  return (
    <div className={styles.page}>
      <ChipsChoice />

      <h1 className={styles.title}>
        {currentCategory.name
          ? formatTurkishPlural(currentCategory.name, language)
          : currentCategory.title || ""}
      </h1>

      {showSubcategories && (
        <div className={styles.wrapper} ref={wrapperRef}>
          <button
            className={`${styles.chip} ${
              activeSubcategoryId === null ? styles.active : ""
            }`}
            onClick={() => handleSubClick(null, 0)}
            ref={(el) => {
              if (el) subRefs.current[0] = el;
            }}
          >
            {language === "tr" ? "Tümü" : "Все"}
          </button>

          {(currentCategory.subcategories || []).map((sub, idx) => (
            <button
              key={sub.id}
              className={`${styles.chip} ${
                activeSubcategoryId === sub.id ? styles.active : ""
              }`}
              onClick={() => handleSubClick(sub.id, idx + 1)}
              ref={(el) => {
                if (el) subRefs.current[idx + 1] = el;
              }}
            >
              {sub.name
                ? formatTurkishPlural(sub.name, language)
                : sub.title || "Без названия"}
            </button>
          ))}
        </div>
      )}

      <div className={styles.column}>
        {displayedProducts.map((p) => (
          <ProductCard
            key={p.id}
            product={{
              id: p.id,
              name: p.name || p.title || "",
              title: p.title,
              description: p.description,
              image: p.image,
              price: p.price,
              size: p.size,
            }}
          />
        ))}
      </div>
    </div>
  );
}
