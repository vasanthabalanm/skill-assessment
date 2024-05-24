using Microsoft.IdentityModel.Tokens;
using SkillAssessment.Interface.Service;
using SkillAssessment.Model.DTO;
using System.IdentityModel.Tokens.Jwt;
using System.Security.Claims;
using System.Text;
#nullable disable

namespace SkillAssessment.Repository.Services.AuthService
{
    public class TokenGenerate : ITokenGenerate
    {
        #region Property
        private readonly SymmetricSecurityKey _key;
        #endregion
        #region Constructor
        /// <summary>
        /// Parameterized Constructor
        /// </summary>
        /// <param name="configuration"></param>
        public TokenGenerate(IConfiguration configuration)
        {
            _key = new SymmetricSecurityKey(Encoding.UTF8.GetBytes(configuration["TokenKey"]));
        }
        #endregion
        #region GenerateToken Service
        public string GenerateToken(UserDTO userDTO)
        {
            string token = string.Empty;
            //User identity
            var claims = new List<Claim>
            {
                new Claim(JwtRegisteredClaimNames.Email,userDTO.Email),
                new Claim(ClaimTypes.Role,userDTO.Role)
            };
            //Signature algorithm
            var cred = new SigningCredentials(_key, SecurityAlgorithms.HmacSha256);
            //Assembling the token details
            var tokenDescription = new SecurityTokenDescriptor
            {
                Subject = new ClaimsIdentity(claims),
                Expires = DateTime.Now.AddDays(1),
                SigningCredentials = cred
            };
            //Using the handler to generate the token
            var tokenHandler = new JwtSecurityTokenHandler();
            var myToken = tokenHandler.CreateToken(tokenDescription);
            token = tokenHandler.WriteToken(myToken);
            return token;
        }
        #endregion
    }
}
