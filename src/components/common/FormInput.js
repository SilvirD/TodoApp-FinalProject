export default function FormInput({
    inputType,
    inputPlaceHolder,
    inputValue,
    onInputChange,
    errorMessage,
  }) {
    const { initial, type, setUserInfo } = onInputChange;
  
    return (
      <div className="FormInput">
        <input
          type={inputType}
          className="block border border-grey-light w-full p-3 rounded mt-4"
          placeholder={inputPlaceHolder}
          value={inputValue}
          onChange={(e) => setUserInfo({ ...initial, [type]: e.target.value })}
        />
  
        {errorMessage ? (
          <p className="text-red-400 font-bold mb-4 pl-2">{errorMessage}</p>
        ) : null}
      </div>
    );
  }