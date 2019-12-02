using OjVolunteer.IBLL;
using OjVolunteer.Model;
using OjVolunteer.Model.Param;
using OjVolunteer.Model.ViewModel;
using System;
using System.Collections.Generic;
using System.IO;
using System.Linq;
using System.Text;
using System.Threading.Tasks;

namespace OjVolunteer.BLL
{
    public partial class UserIDcardService : BaseService<UserIDcard>, IUserIDcardService
    {
        public bool AddCard(UserIDcard card)
        {
            var user = DbSession.UserIDcardDal.GetEntities(u => u.IDcardOwnerId == card.IDcardOwnerId).FirstOrDefault();
            
            if (CurrentDal.Add(card) != null && DbSession.SaveChanges() > 0)
            {
                return true;
            }
            else
            {
                return false;
            }
        }

    }
}
