
const FilterBar = ({priceRange, onPriceChange, sort, onSortChange }) => (
    <div style={{display:"flex", gap:"12", flexWrap:"wrap"}}>
        <div>
            <label style={{fontSize: 13, marginRight:6 }}>Khoang gia: </label>
            <select value={priceRange} onChange={ (e) => onPriceChange(e.target.value)}>
                <option value="all">Tat ca gia</option>
                <option value="under10">Duoi 10 trieu</option>
                <option value="10to20">10 - 20 trieu</option>
                <option value="over20">tren 20 trieu</option>
            </select>
        </div>
        <div>
            <label style={{fontSize: 13, marginRight: 6}}>Sap xep:</label>
            <select value={sort} onChange={ (e) => onSortChange(e.target.value)}>
                <option value="default">Mac dinh</option>
                <option value="priceASC">Gia tang dan</option>
                <option value="priceDESC">Gia giam dan</option>
                <option value="nameAz">Ten A-Z</option>
            </select>
        </div>
    </div>
);
export default FilterBar;