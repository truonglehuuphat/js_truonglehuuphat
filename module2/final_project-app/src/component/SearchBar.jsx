const SearchBar = ({value, onChange}) =>(
    <input
    type="text" 
    placeholder="Tim kiem san pham"
    value ={value} 
    onChange={(e)=>onChange(e.target.value)}
    />
);

export default SearchBar;