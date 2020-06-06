import Item from "../../interfaces/models/Item";
import TransformImageInUrl from '../../interfaces/functions/transformImageInUrl';

const transformImageInUrl: TransformImageInUrl = (arrayOfItems: Item[]) => {
    let transformedArrayOfItems: Item[] = [];

    transformedArrayOfItems = arrayOfItems.map((item) => { 
        return { id: item.id, title: item.title, image: `http://localhost:3333/uploads/${item.image}` }
    });

    return transformedArrayOfItems;
};

export default transformImageInUrl;