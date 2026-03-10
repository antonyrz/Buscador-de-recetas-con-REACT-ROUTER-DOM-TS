import { useMemo } from "react";
import { useLocation, NavLink } from "react-router-dom"

export default function Header() {

    const {pathname} = useLocation();

    const isHome = useMemo(() => pathname === '/', [pathname]);

    console.log(isHome)

  return (
        <header className='bg-slate-800'>
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
                    <form className="md:1/2 2xl:w-1/3 bg-orange-400 my-32 p-10 rounded-lg shadow space-y-6">
                        <div className="space-y-4">
                            <label htmlFor="busqueda"
                            className="block text-white uppercase font-extrabold text-lg"
                            >Nombres o Ingredientes
                            </label>

                            <input 
                                type="text"
                                id="busqueda"
                                name="busqueda"
                                className="w-full p-3 bg-white rounded-lg focus:outline-none"
                                placeholder="Nombre o Ingrediente. Ej. Vodka, Tequila, Café"
                            />
                        </div>

                        <div className="space-y-4">
                            <label htmlFor="category"
                            className="block text-white uppercase font-extrabold text-lg"
                            >Categoría
                            </label>

                            <select
                                id="category"
                                name="category"
                                className="w-full p-3 bg-white rounded-lg focus:outline-none"
                            >
                                <option value="" selected disabled>-- Seleccione --</option>
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
