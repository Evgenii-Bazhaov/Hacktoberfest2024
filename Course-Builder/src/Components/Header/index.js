import React, { useContext } from 'react'
import AddModule from '../AddModule/AddModule'
import { dataContext } from '../../Providers/DataProvider';

const Header = () => {
    const {addModule, handleAddResource, handleAddLink} = useContext(dataContext);
    
    return (
        <div className="flex justify-between w-full max-w-4xl mb-4 mt-5">
        <h1 className="text-2xl font-bold">Course Builder</h1>
            <AddModule
                onAddModule={addModule}
                onAddResource={handleAddResource}
                onAddLink={handleAddLink}
            />
        </div>
    )
}

export default Header