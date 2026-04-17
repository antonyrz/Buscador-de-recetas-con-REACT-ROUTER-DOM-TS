import { useMemo, useEffect, useState, type ChangeEvent } from "react";
import { useLocation, NavLink } from "react-router-dom";
import {useAppStore} from "../stores/useAppStore";

export default function Header() {

    const [searchFilters, setSearchFilter] = useState({
        ingredient: '',
        category: ''
    });

    const {pathname} = useLocation();

    const isHome = useMemo(() => pathname === '/', [pathname]);

    const fetchCategories = useAppStore((state) => state.fetchCategories);
    const categories = useAppStore((state) => state.categories);
    const searchRecipes = useAppStore((state) => state.searchRecipes);

    useEffect(() => {
        fetchCategories();
    }, [])

    const handleChange = (e: ChangeEvent<HTMLInputElement> | ChangeEvent<HTMLSelectElement>) => {

        setSearchFilter({
            ...searchFilters,
            [e.target.name]: e.target.value,
        });
    };

    const handleSubmit = (e: SubmitEvent) => {
        e.preventDefault();

        if(Object.values(searchFilters).includes('')){
            console.log('Todos los campos son Obligatorios');
            return;
        };

        searchRecipes(searchFilters);
    };

  return (
        <header className='bg-header'>
            <div className='mx-auto container px-5 py-16'>
                <div className="flex justify-between items-center">
                    <div>
                        <img src="/logo.svg" alt="logotipo" className="w-32" />
                    </div>

                    <nav className="flex gap-4">
                        <NavLink 
                            to="/" 
                            className={({isActive}) => 
                                isActive ? 'text-orange-500 uppercase font-bold' : 'text-white uppercase font-bold'
                            }>
                            Inicio
                        </NavLink>
                        <NavLink 
                            to="/favoritos"
                            className={({isActive}) => 
                                isActive ? 'text-orange-500 uppercase font-bold' : 'text-white uppercase font-bold'
                            }>
                            Favoritos
                        </NavLink>
                    </nav>
                </div>

                {isHome && (
                    <form 
                        onSubmit={handleSubmit}
                        className="md:1/2 2xl:w-1/3 bg-orange-400 my-32 p-10 rounded-lg shadow space-y-6">
                            <div className="space-y-4">
                                <label htmlFor="busqueda"
                                className="block text-white uppercase font-extrabold text-lg"
                                >Nombres o Ingredientes
                                </label>

                                <input 
                                    onChange={handleChange}
                                    type="text"
                                    id="ingredient"
                                    name="ingredient"
                                    className="w-full p-3 bg-white rounded-lg focus:outline-none"
                                    placeholder="Nombre o Ingrediente. Ej. Vodka, Tequila, Café"
                                    value={searchFilters.ingredient}
                                />
                            </div>

                            <div className="space-y-4">
                                <label htmlFor="category"
                                className="block text-white uppercase font-extrabold text-lg"
                                >Categoría
                                </label>

                                <select
                                    onChange={handleChange}
                                    value={searchFilters.category}
                                    id="category"
                                    name="category"
                                    className="w-full p-3 bg-white rounded-lg focus:outline-none"
                                >
                                    <option value="" selected disabled>-- Seleccione --</option>
                                    {categories.drinks.map((category) =>  (
                                        <option key={category.strCategory} value={category.strCategory}>{category.strCategory}</option>
                                    ))}
                                </select>

                            </div>

                            <input type="submit" value="Buscar Recetas" 
                            className="cursor-pointer bg-orange-800 hover:bg-orange-900 text-white font-extrabold w-full p-2 rounded-lg uppercase"/>
                    </form>
                )}
            </div>
        </header>
    )
}
